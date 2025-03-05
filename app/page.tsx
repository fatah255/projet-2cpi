"use client";
import { Irish_Grover,Inter } from 'next/font/google';
import { Button } from "@/components/ui/Button";
import Hero from '@/components/Hero';
const irish_grover = Irish_Grover({ weight: '400', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
export default function Home() {
  return (
    <>
      {/* hna landing page  */}
      <div className={`${irish_grover.className} ${inter.className} bg-navbar_color bg-opacity-20`}>
        <Hero/>

      </div>
    </>
  );
}
