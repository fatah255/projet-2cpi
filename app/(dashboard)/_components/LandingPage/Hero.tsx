import React from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import boardImage from "../app/assets/board.png";
import Blob from "../app/assets/blob.svg";
import  { motion } from 'framer-motion';
import { Irish_Grover } from 'next/font/google';
const irish_grover = Irish_Grover({ weight: '400', subsets: ['latin'] });
export const FadeUp = (delay:number) =>{
  return{
    initial:{
      opacity:0,
      y:50,

    },
    animate:{
      opacity:1,
      y:0,
      transition:{
        type:'spring',
        stiffness:100,
        duration:0.5,
        delay:delay,
        ease:"easeInOut"
      }
    }

  }
}

const Hero = () => {
  return (
    <section className='overflow-hidden relative bg-navbar_color bg-opacity-20 '>
      <Navbar />
      <div className='container grid grid-cols-1 md:grid-cols-2 min-h-[650px]'>
        <div className=' flex flex-col md:gap-10  justify-center py-14 md:py-0  z-20'>
          
           <div className='text-center md:text-left xs:space-y-2  '>  
           <Image src={Blob} alt="" className='absolute bottom-3 -left-96 w-[1500px]  z-[1]  rotate-3 hidden  md:block '/>
            
            <div className='flex flex-col gap-5'>
              <motion.h1 
              variants={FadeUp(0.4)}
              initial='initial'
              animate='animate'

              className='text-[#11009E] text-3xl lg:text-5xl font-bold !leading-snug relative z-20 '>The leading online  
              <span className={` ${irish_grover.className}`}> whiteboard</span> for teaching </motion.h1>
              <motion.p 
              variants={FadeUp(0.6)}
              initial='initial'
              animate='animate'
              className='text-[#11009E] text-lg lg:text-2xl relative z-20 '>
                boost your presence and leverage teacher
                awesomeness with whiteboard in your classroom! 
                Give students more valuable one-on-one teaching
                time than ever before.Provide targeted feedback 
                on an individual level to help students master 
                learning content 
              </motion.p>

            </div>

           </div>
        </div>
        <motion.div 
        initial={{x:50,opacity:0}}
        animate={{x:0,opacity:1}}
        transition={{duration:0.6,delay:0.2,ease:"easeInOut"}}
        className='flex justify-center items-center '>
          <Image src={boardImage} alt='board' className='w-[800px] relative z-20 drop-shadow' />
          
        </motion.div>

      </div>
    </section>
  );
}

export default Hero
