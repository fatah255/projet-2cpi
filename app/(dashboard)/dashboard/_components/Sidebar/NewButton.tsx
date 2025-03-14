"use client"
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { CreateOrganization } from "@clerk/nextjs";
import Hint from "@/app/(dashboard)/dashboard/_components/Sidebar/Hint";
//This is the plus button displayed in the sidebar in order to create a new organization
function NewButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button 
          aria-label="Create Organization"
          className="bg-white/25 w-[69px] h-[65px] rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition"
        >
          <Hint label="Create organization" side="right" align="start" sideOffset={18}>
            <Plus className="text-white" />
          </Hint>
        </button>
      </DialogTrigger>
      
      <DialogContent >
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
}

export default NewButton;
