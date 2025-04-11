" use client ";
import { memo } from "react";
import { connectionIdToColor } from "@/lib/utils";
import { MousePointer2 } from "lucide-react";
import { networkInterfaces } from "os";
import { useOther } from "@liveblocks/react";
import { useOrganization } from "@clerk/nextjs";

interface CursorProps {
  connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
  //check if the user is an admin
  const { membership } = useOrganization();
  const isAdmin = membership && membership?.role === "org:admin";
  const info = useOther(connectionId, (other) => other.info);
  const cursor = useOther(connectionId, (other) => other.presence.cursor);
  const name = info?.name || "Anonymous";

  if (!cursor) return null;

  const { x, y } = cursor;
  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      width={name.length * 10 + 24}
      height={50}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
        style={{ backgroundColor: connectionIdToColor(connectionId) }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";
