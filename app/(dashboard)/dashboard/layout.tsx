interface DashboardLayoutProps {
    children: React.ReactNode;
}
import React from 'react'
import Sidebar from './_components/Sidebar/SideBare'
import OrgSidebar from './_components/Sidebar/OrgSidebar';
import Navbar from './_components/Navbar';
import { Irish_Grover, Inter } from 'next/font/google';
const irish_grover = Irish_Grover({ weight: '400', subsets: ['latin'] });
const inter = Inter({ weight: ['400', '700'], subsets: ['latin'] });

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className='h-full'>
        <Sidebar/>
        <div className='h-full pl-[110px]'>
            <div className='flex  h-full'>
                <OrgSidebar/>
                <div className='h-full flex-1'>
                    {/*Navbar*/}
                    <Navbar/>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout
