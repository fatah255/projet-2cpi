import React from 'react'
import {motion} from  'framer-motion';
import { Irish_Grover,Inter } from 'next/font/google';
const irish_grover = Irish_Grover({ weight: '400', subsets: ['latin'] });
const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const Navbar = () => {
  return (
    <>
        <nav className='bg-navbar_color bg-opacity-5  relative  '> 
           <motion.div 
           initial={{opacity:0,y:-50}}
           animate={{opacity:1,y:0}}
           className=" mx-auto p-4 flex flex-row flex-wrap sm:justify-between sm:items-center xs:justify-center xs:space-y-1 gap-3">
              <div className={`flex gap-5 items-center  ${irish_grover.className}`}   >
                <h1 className=' not-italic font-bold bg-[#11009E] text-sky-50 rounded-3xl p-2 text-4xl w-15 h-13 flex items-center py-1 px-3 z-30  '>W</h1>
                <h1 className='text-[#11009E] text-5xl z-30'>Whiteboard</h1>
              </div>
                <div className='flex space-x-4 border-borderColor-custom-blue border-[3px] rounded-[20px] py-1 px-4 font-normal max-w-[378px] max-h-[76px] '>
                <div className='py-1 px-4 font-bold text-[#11009E] text-xl'><button>Log in</button></div>
                <div className='rounded-full font-bold text-white py-1 px-4 hover:opacity-75 bg-signUp-button text-xl'>
                  <button>Sign Up</button>
                </div>
                </div>
            </motion.div>
        
        </nav>
    </>
  )
}

export default Navbar
