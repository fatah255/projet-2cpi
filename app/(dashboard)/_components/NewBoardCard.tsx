"use client";

import { cn } from "@/lib/utils";
import { Dialog } from "@headlessui/react";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface NewBoardCardProps {
  orgId: string;
  disabled?: boolean;
}

const NewBoardCard = ({ orgId, disabled }: NewBoardCardProps) => {
  const create = useMutation(api.board.create);
  const onClick = () => {
    create({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created");
        //redirect to the newly created board
      })
      .catch(() => {
        toast.error("Failed to create");
      });
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col justify-center items-center py-6",
        disabled && "opacity-75 cursor-not-allowed hover:bg-blue-600"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New Board</p>
    </button>
  );
};

export default NewBoardCard;
