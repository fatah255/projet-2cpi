"use client"; 
import React from 'react'
import { cn } from '@/lib/utils';
import Link from 'next/link'
import { Button } from '@/components/ui/Button';
import { LayoutDashboard,Star } from 'lucide-react';
import Image from 'next/image'
import { Irish_Grover, Inter } from 'next/font/google';
import { OrganizationSwitcher } from '@clerk/clerk-react';
import {useSearchParams} from "next/navigation";
const irish_grover = Irish_Grover({ weight: '400', subsets: ['latin'] });
const inter = Inter({ weight: ['400', '700'], subsets: ['latin'] });

// This helps changing the settings of the organization and switch organizations in a different view

function OrgSidebar() {
  const  searchParams = useSearchParams();
  const favorites = searchParams.get('favorites');
  return (
    <div className='hidden lg:flex h-screen flex-col space-y-6 w-[300px]  pl-5 pt-5 border-2  border-r-gray-200'>
      {/*if we click on it "W Whiteboard" we go back to landing page*/}
      <Link href="/">
       <div className={`flex gap-2 items-center  ${irish_grover.className}`}   >
        <h1 className=' not-italic font-bold bg-[#11009E] text-sky-50 rounded-3xl p-2 text-4xl w-15 h-13 flex items-center py-1 px-3  '>W</h1>
        <h1 className='text-[#11009E] text-4xl '>Whiteboard</h1>
       </div>
      </Link>
      <OrganizationSwitcher //This is a clerk component that allows users to switch between different organizations 
      hidePersonal //to not display personal accounte
      appearance={{
        elements:{
          rootBox:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
          },
          organizationSwitcherTrigger:{
            padding:'10px',
            width:'100%',
            borderRadius:'8px',
            border:'1px solid #11009E',
            justifyContent:'space-between',
            backgroundColor:"#EEE0EB",


          }
        }
      }
      }/>
      <div className='space-y-4 w-full '>
        <Button 
          variant={favorites ? "sideBar" :"sideBare"} /* focus on the button clicked */
          asChild
          size="sm"
          className='justify-start px-2 '
        >
         <Link href="/dashboard">
            <LayoutDashboard className='h-10 w-5 mr-2 text-[#11009E] text-4xl flex justify-start'/> {/*THis is a lucid-react icon*/}
            Team boards
          </Link>
        </Button>
        <Button 
          asChild
          size="sm"
          
          variant={favorites ? "sideBare" :"sideBar"} 
          className='justify-start px-2'
        >
         <Link href={{
          pathname:"/dashboard",
          query:{favorites:true}
         }}>
            <Star className='h-10 w-5 mr-2 text-[#11009E] text-4xl flex justify-start'/> {/*THis is a lucid-react icon*/}
            Favorite boards
          </Link>
        </Button>
      </div>
    </div> 
  )
}

export default OrgSidebar
