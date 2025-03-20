"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import UserAvatar from "./UserAvatar";
import { useSelf, useOthers } from "@liveblocks/react/suspense";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 2;
const Participants = () => {
  const user = useSelf();
  const others = useOthers();
  const hasMoreUsers = others.length > MAX_SHOWN_USERS;
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {others.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "A"}
            />
          );
        })}
        {user && (
          <UserAvatar
            src={user.info?.picture}
            name={`${user.info?.name} (You)`}
            fallback={user.info?.name?.[0] || "A"}
            borderColor={connectionIdToColor(user.connectionId)}
          />
        )}
        {hasMoreUsers && (
          <UserAvatar
            name={`${others.length - MAX_SHOWN_USERS} more`}
            fallback={`+${others.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
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
