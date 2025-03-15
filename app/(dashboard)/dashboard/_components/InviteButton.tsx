import {Plus} from "lucide-react";
import {OrganizationProfile} from "@clerk/nextjs";
import{
    Dialog,
    DialogContent,
    DialogTrigger

}from "@/components/ui/dialog"
import {Button} from "@/components/ui/Button"
import React from 'react'

function InviteButton() {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="navBar" className="w-[292px] h-[35px] bg-#EEE0EB top-1/2 left-3 transform -translate-y-1/2 rounded-none ">
                <Plus className="h-4 w-4 mr-2 flex justify-start items-start"/>
                Invite members
            </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
            <OrganizationProfile/>
        </DialogContent>
    </Dialog>
  )
}

export default InviteButton
