"use client"
import React from 'react'
import SearchInput from './SearchInput'
import InviteButton from './InviteButton';
import { OrganizationSwitcher,useOrganization } from '@clerk/clerk-react';

function navbar() {
  const organization=useOrganization()
  return (
    <div className='flex flex-row items-center gap-x-8 p-5  '>
        <div className='   rounded-none h-[70px] '>
         <SearchInput/>
        </div>
        <div className=' block lg:hidden flex-1  w-[292px] h-[70px] '>
            <OrganizationSwitcher 
          hidePersonal
          appearance={{
            elements:{
              rootBox:{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                width:'100%',
                maxWidth:"376px"
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
        </div>
        {organization && (<InviteButton/>)}
        
        
      
    </div>
  )
}

export default navbar
