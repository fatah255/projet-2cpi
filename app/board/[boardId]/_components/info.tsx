"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import Link from "next/link";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/use-rename";
import Actions from "@/components/global/actions";
import { Menu } from "lucide-react";
interface InfoProps {
  boardId: string;
}

const font = Poppins({ subsets: ["latin"], weight: ["400"] });
const Info = ({ boardId }: InfoProps) => {
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
                  "text-xl font-semibold ml-2 text-blue-700 ",
                  font.className
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
      <Hint label="Edit Title" side="bottom" sideOffset={10}>
        <div>
          <Button
            onClick={() => {
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
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
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
