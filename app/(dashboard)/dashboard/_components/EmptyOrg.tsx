import React from 'react'
import Image from 'next/image'
import {OrganizationProfile} from "@clerk/nextjs";
import{
    Dialog,
    DialogContent,
    DialogTrigger

}from "@/components/ui/dialog"
import {Button} from "@/components/ui/Button"

//if no organization is created this root page will be displayed
function EmptyOrg() {
  return (
    <div className='h-full flex flex-col items-center justify-center '>
      <Image
        src="/empty.svg"
        alt="Empty"
        height={200}
        width={200}   
       />
       <h2 className='text-2xl font-semibold mt-8 text-[#11009E]'>Welcome to Board</h2>
       <p className='mt-2 text-muted-foreground text-sm'>Create an organization to get started</p>
       <div className='mt-8'>
          <Dialog >
                <DialogTrigger asChild>
                    <Button variant="new"  className="top-1/2 left-3 transform -translate-y-1/2 ">
                        Create organization
                    </Button>
                </DialogTrigger>
                <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
                    <OrganizationProfile/>
                </DialogContent>
          </Dialog>
       </div>
    </div>
  )
}

export default EmptyOrg
