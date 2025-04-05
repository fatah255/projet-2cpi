"use client";

import {
  LiveKitRoom,
  useRoomContext,
  useParticipants,
} from "@livekit/components-react";
import { useEffect } from "react";
import {
  useSelf,
  useOthers,
  useMutation,
  useStorage,
} from "@liveblocks/react/suspense";
import { TrackLoop, AudioTrack, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";

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
}: {
  token: string;
  url: string;
  isAdmin: boolean;
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
      <AudioControls isAdmin={isAdmin} />
      <RemoteAudio />
    </LiveKitRoom>
  );
}

function AudioControls({ isAdmin }: { isAdmin: boolean }) {
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
        if (context.state === "suspended") {
          await context.resume();
          console.log("🔊 AudioContext resumed");
        }
      } catch (e) {
        console.warn("❌ Failed to resume audio:", e);
      }
    };

    // Only resume after click (required by browser policy)
    window.addEventListener("click", resumeAudio, { once: true });

    return () => {
      window.removeEventListener("click", resumeAudio);
    };
  }, []);

  const isGloballyMuted = useStorage(
    (root) => root.mutedUsers?.get(String(me?.id) ?? "") ?? false
  );

  useEffect(() => {
    if (isGloballyMuted) {
      localParticipant.setMicrophoneEnabled(false);
    }
  }, [isGloballyMuted, localParticipant]);

  const muteUser = useMutation(({ storage }, id: string) => {
    const mutedUsers = storage.get("mutedUsers");
    mutedUsers.set(String(id), true);
  }, []);

  const unmuteUser = useMutation(({ storage }, id: string) => {
    const mutedUsers = storage.get("mutedUsers");
    mutedUsers.set(String(id), false);
  }, []);

  const setMuted = useMutation(({ setMyPresence }, value: boolean) => {
    setMyPresence({ mutedByAdmin: value });
    if (value) {
      localParticipant.setMicrophoneEnabled(false);
    }
  }, []);

  const raiseHand = useMutation(({ setMyPresence }) => {
    setMyPresence({ raiseHand: true });
  }, []);
  const lowerHand = useMutation(({ setMyPresence }) => {
    setMyPresence({ raiseHand: false });
  }, []);

  // Auto mute if admin muted you
  useEffect(() => {
    if (me?.mutedByAdmin) {
      localParticipant.setMicrophoneEnabled(false);
    }
  }, [me?.mutedByAdmin, localParticipant]);

  const toggleMic = () => {
    if (me?.mutedByAdmin) return; // ❌ can't unmute if admin muted you
    localParticipant.setMicrophoneEnabled(
      !localParticipant.isMicrophoneEnabled
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-md absolute !top-1 !right-1/2 z-50 ">
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
            {others.map(({ connectionId, presence, info }) => (
              <li
                key={connectionId}
                className="flex items-center justify-between border-b pb-1"
              >
                <span>
                  {info?.name || connectionId}
                  {presence?.raiseHand && " ✋"}
                </span>
                <div className="space-x-2 text-xs">
                  <button
                    onClick={() => unmuteUser(connectionId)}
                    className="text-green-600"
                  >
                    Unmute
                  </button>
                  <button
                    onClick={() => muteUser(connectionId)}
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
