"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { use, useEffect, useState } from "react";
import {
  useSelf,
  useOthers,
  useMutation,
  useStorage,
} from "@liveblocks/react/suspense";
import { connectionIdToColor } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useBroadcastEvent } from "@liveblocks/react";
import { Button } from "@/components/ui/Button";
import {
  AudioTrack,
  ParticipantTile,
  RoomAudioRenderer,
  TrackLoop,
  useRoomContext,
  useTracks,
} from "@livekit/components-react";
import { toast } from "sonner";
import { Track } from "livekit-client";
import { Mic, MicOff } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import RiseHand from "@/components/global/RiseHand";
import LowerHand from "@/components/global/LowerHand";
import { AnimatedSpeaker } from "@/components/global/AnimatedSpeaker";
import SoundOn from "@/components/global/SoundOn";
import SoundOff from "@/components/global/SoundOff";
import RaisedHand from "@/components/global/RaisedHand";

const MAX_SHOWN_USERS = 2;

function RemoteAudio({ soundEnabled }: { soundEnabled: boolean }) {
  const tracks = useTracks([Track.Source.Microphone]);
  return (
    <TrackLoop tracks={tracks}>
      <AudioTrack volume={soundEnabled ? 1 : 0} />
    </TrackLoop>
  );
}

const Participants = ({
  isAdmin,
  roomId,
}: {
  isAdmin: boolean;
  roomId: string;
}) => {
  const speakingTracks = useTracks([Track.Source.Microphone]).filter(
    (track) => track.participant.isSpeaking
  );
  const speakingIds = speakingTracks.map((t) => t.participant.identity);

  const broadcast = useBroadcastEvent();
  const { localParticipant } = useRoomContext();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const roomContext = useRoomContext();
  const [micEnabled, setMicEnabled] = useState(
    localParticipant.isMicrophoneEnabled
  );
  const self = useSelf((me) => ({
    id: me.id,
    connectionId: me.connectionId,
    name: me.info?.name,
    picture: me.info?.picture,
    mutedByAdmin: me.presence.mutedByAdmin,
    raiseHand: me.presence.raiseHand,
  }));

  const others = useOthers();

  const hasMoreUsers = others.length > MAX_SHOWN_USERS;

  const isGloballyMuted = useStorage(
    (root) => root.mutedUsers?.get(String(self?.id) ?? "") ?? false
  );
  const { user } = useUser();
  useEffect(() => {
    if (isGloballyMuted || self?.mutedByAdmin) {
      localParticipant.setMicrophoneEnabled(false);
    }
  }, [isGloballyMuted, self?.mutedByAdmin, localParticipant]);

  // const raiseHand = useMutation(({ setMyPresence }) => {
  //   setMyPresence({ raiseHand: true });

  // }, []);
  const raiseHand = useMutation(({ setMyPresence }) => {
    setMyPresence({ raiseHand: true });
    broadcast({ type: "RAISE_HAND", name: self?.name });
  }, []);

  const lowerHand = useMutation(({ setMyPresence }) => {
    setMyPresence({ raiseHand: false });
  }, []);

  const toggleMic = async () => {
    const res = await fetch("/api/get-publish-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId,
        identity: user?.id,
      }),
    });

    const data = await res.json();

    if (!data.canPublish) {
      toast.error("You are muted by the admin.");
      return;
    }

    try {
      const newMicState = !localParticipant.isMicrophoneEnabled;
      await localParticipant.setMicrophoneEnabled(newMicState);
      setMicEnabled(newMicState);
    } catch (err) {
      console.error("Mic toggle error:", err);
    }
  };

  const muteUser = async (identity: string) => {
    await fetch("/api/update-participant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, identity, canPublish: false }),
    });
  };

  const unmuteUser = async (identity: string) => {
    await fetch("/api/update-participant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, identity, canPublish: true }),
    });
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
          <div className="flex gap-x-2">
            {others.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
              <UserAvatar
                key={connectionId}
                borderColor={connectionIdToColor(connectionId)}
                src={info?.picture}
                name={info?.name}
                fallback={info?.name?.[0] || "A"}
              />
            ))}
            {self && (
              <UserAvatar
                src={self.picture}
                name={`${self.name} (You)`}
                fallback={self.name?.[0] || "A"}
                borderColor={connectionIdToColor(self.connectionId)}
              />
            )}
            {hasMoreUsers && (
              <UserAvatar
                name={`${others.length - MAX_SHOWN_USERS} more`}
                fallback={`+${others.length - MAX_SHOWN_USERS}`}
              />
            )}
          </div>
          <RemoteAudio soundEnabled={soundEnabled} />
          <RoomAudioRenderer />
        </div>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Participants</SheetTitle>
        </SheetHeader>

        {/* --- Self Controls --- */}
        <div className="mt-4 flex gap-2 flex-wrap">
          <Button onClick={toggleMic} disabled={!!self?.mutedByAdmin}>
            {micEnabled ? <Mic /> : <MicOff />}
          </Button>
          <Button variant="outline" onClick={() => setSoundEnabled((s) => !s)}>
            {soundEnabled ? <SoundOn /> : <SoundOff />}
          </Button>

          {!isAdmin && (
            <>
              <Button variant="secondary" onClick={raiseHand}>
                <RiseHand />
              </Button>
              <Button variant="secondary" onClick={lowerHand}>
                <LowerHand />
              </Button>
            </>
          )}
        </div>

        {/* --- Participant List --- */}
        <div className="mt-6 space-y-3">
          {others.map(({ id, info, presence }) => {
            const isSpeaking = speakingIds.includes(id);
            return (
              <div
                key={id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center gap-2">
                  <UserAvatar
                    src={info?.picture}
                    name={info?.name}
                    fallback={info?.name?.[0] || "A"}
                  />
                  <span>{info?.name}</span>
                  {presence?.raiseHand && (
                    <span className="ml-1">
                      <RaisedHand />
                    </span>
                  )}
                  {isSpeaking && (
                    <span className="ml-1">
                      <AnimatedSpeaker isSpeaking={isSpeaking} />
                    </span>
                  )}
                </div>
                {isAdmin && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      className="text-green-600 text-xs"
                      onClick={() => unmuteUser(String(id))}
                    >
                      Unmute
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red-600 text-xs"
                      onClick={() => muteUser(String(id))}
                    >
                      Mute
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Participants;

export const ParticipantsSkeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]">
      <Skeleton className="w-full h-full bg-muted-400" />
    </div>
  );
};
