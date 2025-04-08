"use client";

import {
  LiveKitRoom,
  useRoomContext,
  useTracks,
  AudioTrack,
  TrackLoop,
  RoomAudioRenderer,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect } from "react";
import {
  useSelf,
  useOthers,
  useMutation,
  useStorage,
} from "@liveblocks/react/suspense";

function RemoteAudio() {
  const tracks = useTracks([Track.Source.Microphone]);
  return (
    <TrackLoop tracks={tracks}>
      <AudioTrack />
    </TrackLoop>
  );
}

export function VoiceRoom({
  token,
  url,
  isAdmin,
  roomId,
}: {
  token: string;
  url: string;
  isAdmin: boolean;
  roomId: string;
}) {
  return (
    <LiveKitRoom
      token={token}
      serverUrl={url}
      connect
      audio
      video={false}
      data-lk-theme="default"
    >
      <AudioControls isAdmin={isAdmin} roomId={roomId} />
      <RemoteAudio />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}

function AudioControls({
  isAdmin,
  roomId,
}: {
  isAdmin: boolean;
  roomId: string;
}) {
  const { localParticipant } = useRoomContext();
  const others = useOthers();
  const me = useSelf((me) => ({
    id: me.id,
    mutedByAdmin: me.presence.mutedByAdmin,
    raiseHand: me.presence.raiseHand,
  }));

  useEffect(() => {
    const resumeAudio = async () => {
      try {
        const context = new AudioContext();
        if (context.state === "suspended") await context.resume();
      } catch (e) {
        console.warn("Audio resume failed", e);
      }
    };
    window.addEventListener("click", resumeAudio, { once: true });
    return () => window.removeEventListener("click", resumeAudio);
  }, []);

  const isGloballyMuted = useStorage(
    (root) => root.mutedUsers?.get(String(me?.id) ?? "") ?? false
  );

  useEffect(() => {
    if (isGloballyMuted) {
      localParticipant.setMicrophoneEnabled(false);
    }
  }, [isGloballyMuted, localParticipant]);

  const setMuted = useMutation(({ setMyPresence }, value: boolean) => {
    setMyPresence({ mutedByAdmin: value });
    if (value) localParticipant.setMicrophoneEnabled(false);
  }, []);

  const raiseHand = useMutation(({ setMyPresence }) => {
    setMyPresence({ raiseHand: true });
  }, []);
  const lowerHand = useMutation(({ setMyPresence }) => {
    setMyPresence({ raiseHand: false });
  }, []);

  useEffect(() => {
    if (me?.mutedByAdmin) localParticipant.setMicrophoneEnabled(false);
  }, [me?.mutedByAdmin, localParticipant]);

  const toggleMic = () => {
    if (me?.mutedByAdmin) return;
    localParticipant.setMicrophoneEnabled(
      !localParticipant.isMicrophoneEnabled
    );
  };

  const muteUser = async (identity: string) => {
    await fetch("/api/update-participant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId,
        identity,
        canPublish: false,
      }),
    });
  };

  const unmuteUser = async (identity: string) => {
    await fetch("/api/update-participant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId,
        identity,
        canPublish: true,
      }),
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-md absolute !top-1 !right-1/2 z-50">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Mic</span>
        <button
          onClick={toggleMic}
          className="px-3 py-1 rounded text-white bg-blue-500 disabled:bg-gray-400"
          disabled={!!me?.mutedByAdmin}
        >
          {localParticipant.isMicrophoneEnabled ? "Mute" : "Unmute"}
        </button>
      </div>

      {!isAdmin && (
        <div className="space-x-2 mt-2">
          <button
            onClick={raiseHand}
            className="text-sm px-2 py-1 bg-yellow-400 text-black rounded"
          >
            ✋ Raise Hand
          </button>
          <button
            onClick={lowerHand}
            className="text-sm px-2 py-1 bg-gray-300 text-black rounded"
          >
            Lower
          </button>
        </div>
      )}

      {isAdmin && (
        <div className="mt-4">
          <h4 className="font-semibold text-sm">Participants</h4>
          <ul className="space-y-1 mt-2">
            {others.map(({ info, presence }) => (
              <li
                key={info?.id || info?.name}
                className="flex items-center justify-between border-b pb-1"
              >
                <span>
                  {info?.name || info?.id}
                  {presence?.raiseHand && " ✋"}
                </span>
                <div className="space-x-2 text-xs">
                  <button
                    onClick={() => {
                      unmuteUser(String(info?.id)!);
                      console.log("Unmuted", info?.id);
                    }}
                    className="text-green-600"
                  >
                    Unmute
                  </button>
                  <button
                    onClick={() => {
                      muteUser(String(info?.id)!);
                      console.log("Muted", info?.id);
                    }}
                    className="text-red-600"
                  >
                    Mute
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
