"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/use-rename";
import Actions from "@/components/global/actions";
import { Menu } from "lucide-react";
import { Irish_Grover, Inter } from "next/font/google";
const irish_grover = Irish_Grover({ weight: "400", subsets: ["latin"] });
import { useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import { useEffect } from "react";
import {
  useBroadcastEvent,
  useEventListener,
} from "@liveblocks/react/suspense";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});
interface InfoProps {
  boardId: string;
}

const font = Poppins({ subsets: ["latin"], weight: ["400"] });
const Info = ({ boardId }: InfoProps) => {
  // check if the user is an admin
  const { membership } = useOrganization();
  const isAdmin = membership && membership?.role === "org:admin";
  //so the other users know that the board has been renamed
  const broadcastEvent = useBroadcastEvent();
  const router = useRouter();
  useEventListener(({ event }) => {
    //@ts-ignore
    if (event.type === "redirect" && event.to) {
      //@ts-ignore
      router.push(event.to);
    }
  });
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });
  if (!data) {
    return <InfoSkeleton />;
  }

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-14 flex items-center shadow-md">
      <Hint label="Go to Home" side="bottom" sideOffset={10}>
        <div>
          {/* @ts-ignore */}
          <Button asChild variant="board">
            <Link href="/">
              <Image src="/logo.svg" alt="logo" height={40} width={40} />
              <span
                className={cn(
                  "text-[#11009E] text-2xl",
                  irish_grover.className
                )}
              >
                WHITEBOARD
              </span>
            </Link>
          </Button>
        </div>
      </Hint>
      {/* A seperator */}
      <div className="text-neutral-300 px-1.5">|</div>
      <Hint
        label={isAdmin ? "Edit Title" : "Board Title"}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <Button
            onClick={() => {
              if (!isAdmin) return;
              onOpen(data._id, data.title);
            }}
            variant="board"
            className="text-base font-normal px-2 text-black"
          >
            {data.title}
          </Button>
        </div>
      </Hint>
      {/* A seperator */}
      <div className="text-neutral-300 px-1.5">|</div>
      <Actions
        broadcastEvent={broadcastEvent}
        id={data._id}
        title={data.title}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <Hint label="Main Menu" side="bottom" sideOffset={10}>
            <div>
              <Button size="icon" variant="board">
                <Menu />
              </Button>
            </div>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export default Info;

export const InfoSkeleton = function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]">
      <Skeleton className="w-full h-full bg-muted-400" />
    </div>
  );
};
