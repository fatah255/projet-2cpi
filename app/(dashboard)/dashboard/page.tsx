'use client'
import React from 'react'
import { Irish_Grover, Inter } from 'next/font/google';
const irish_grover = Irish_Grover({ weight: '400', subsets: ['latin'] });
const inter = Inter({ weight: ['400', '700'], subsets: ['latin'] });
import EmptyOrg from './_components/EmptyOrg';
import { useOrganization } from '@clerk/nextjs';
import BoardList from './_components/BoardList';
interface DashboardPageProps{
  searchParams:{
    search? :string;
    favorites? : string
  }
}

//You have to enable organization for this app from your clerk accounte

function DashboardPage({
  searchParams,
}:DashboardPageProps) {
  const {organization}=useOrganization();
  return (
    <div className=' flex-1 h-[616px] p-6 '>
      {!organization ? (
        <EmptyOrg/>
      ):(
        <BoardList
          orgId={organization.id}
          query={searchParams}
        />
      )
    }
      
    </div>
  )
}

export default DashboardPage
