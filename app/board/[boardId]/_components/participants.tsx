"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { useEffect } from "react";
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
import { Button } from "@/components/ui/Button";
import {
  AudioTrack,
  RoomAudioRenderer,
  TrackLoop,
  useRoomContext,
  useTracks,
} from "@livekit/components-react";
import { toast } from "sonner";
import { Track } from "livekit-client";

const MAX_SHOWN_USERS = 2;

function RemoteAudio() {
  const tracks = useTracks([Track.Source.Microphone]);
  return (
    <TrackLoop tracks={tracks}>
      <AudioTrack />
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
  const { localParticipant } = useRoomContext();
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

  useEffect(() => {
    if (isGloballyMuted || self?.mutedByAdmin) {
      localParticipant.setMicrophoneEnabled(false);
    }
  }, [isGloballyMuted, self?.mutedByAdmin, localParticipant]);

  const raiseHand = useMutation(({ setMyPresence }) => {
    setMyPresence({ raiseHand: true });
  }, []);

  const lowerHand = useMutation(({ setMyPresence }) => {
    setMyPresence({ raiseHand: false });
  }, []);

  const toggleMic = async () => {
    if (self?.mutedByAdmin) return;
    try {
      await localParticipant.setMicrophoneEnabled(
        !localParticipant.isMicrophoneEnabled
      );
    } catch (err) {
      console.error("Mic error:", err);
      toast.error("You are muted by the admin.");
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
          <RemoteAudio />
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
            {localParticipant.isMicrophoneEnabled
              ? "Mute Myself"
              : "Unmute Myself"}
          </Button>

          {!isAdmin && (
            <>
              <Button onClick={raiseHand}>✋ Raise Hand</Button>
              <Button variant="secondary" onClick={lowerHand}>
                Lower
              </Button>
            </>
          )}
        </div>

        {/* --- Participant List --- */}
        <div className="mt-6 space-y-3">
          {others.map(({ id, info, presence }) => (
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
                {presence?.raiseHand && <span className="ml-1">✋</span>}
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
          ))}
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
