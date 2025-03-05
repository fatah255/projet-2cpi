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
    <section className='overflow-hidden relative  '>
      <Navbar />
      <div className='container grid grid-cols-1 md:grid-cols-2 min-h-[650px]'>
        <div className=' flex flex-col md:gap-10  justify-center py-14 md:py-0  z-20'>
          
           <div className='  xs:space-y-2  '>  
           <Image src={Blob} alt="" className='absolute -top-96 -left-96  w-[1500px]  z-[1]  -rotate-12 hidden  md:block '/>
            
            <div className='text-center md:text-left flex flex-col gap-5'>
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
        className='flex justify-center items-center relative z-20 '>
          <Image src={boardImage} alt='board' className='w-[800px] relative z-20 drop-shadow' />
          
        </motion.div>

      </div>
      <div className=" p-10 font-sans relative z-20">
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-md max-w-md">
              <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2">Effortless Teaching, Limitless Learning</h3>
              <p className="mt-4">Create your virtual classroom in seconds—no complicated setup, just a simple and intuitive space for seamless teaching. Focus on delivering great lessons while The Wightboard keeps everything organized for you and your students.</p>
          </motion.div>
          <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-md max-w-md">
              <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2">Stay Focused, Never Miss a Word</h3>
              <p className="mt-4">Forget the stress of copying notes while the teacher explains. The Wightboard automatically captures every whiteboard update, allowing you to focus on learning. Review everything later at your own pace—all in just one click.</p>
          </motion.div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
              <h4 className="text-lg font-semibold border-b border-blue-700 pb-2">How to Use The Wightboard as a Teacher</h4>
              <ul className="mt-4 space-y-4">
                <motion.div 
                variants={FadeUp(0.2)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}>
                    <li className="p-4 bg-pink-200 border-l-4 border-blue-700 shadow-sm">
                        <h6 className="font-bold">1. Create Your Classroom</h6>
                        <p className="text-sm">Set up your virtual room in seconds—no complex setup, just an intuitive space designed for effortless teaching.</p>
                    </li>
                  </motion.div>
                  <motion.div
                    variants={FadeUp(0.4)}
                    initial="initial"
                    whileInView={"animate"}
                    viewport={{ once: true }}
                  >
                    <li className="p-4 bg-pink-200 border-l-4 border-blue-700 shadow-sm">
                        <h6 className="font-bold">2. Invite Your Students</h6>
                        <p className="text-sm">Share a unique invite link, allowing students to join instantly—no registrations, no hassle.</p>
                    </li>
                  </motion.div>
                  <motion.div
                   variants={FadeUp(0.6)}
                   initial="initial"
                   whileInView={"animate"}
                   viewport={{ once: true }}
                  >
                    <li className="p-4 bg-pink-200 border-l-4 border-blue-700 shadow-sm">
                        <h6 className="font-bold">3. Teach Without Distractions</h6>
                        <p className="text-sm">Focus on your lesson while The Wightboard automatically captures every whiteboard update in real time.</p>
                    </li>
                  </motion.div>
                  <motion.div
                    variants={FadeUp(0.8)}
                    initial="initial"
                    whileInView={"animate"}
                    viewport={{ once: true }}
                  >
                    <li className="p-4 bg-pink-200 border-l-4 border-blue-700 shadow-sm">
                        <h6 className="font-bold">4. Keep Lessons Organized</h6>
                        <p className="text-sm">Every session is neatly stored, making it easy for students to revisit past lessons and stay on track.</p>
                    </li>
                  </motion.div>
              </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
              <h4 className="text-lg font-semibold border-b border-blue-700 pb-2">How to Use The Wightboard as a Student</h4>
              <ul className="mt-4 space-y-4">
                <motion.div 
                  variants={FadeUp(0.2)}
                  initial="initial"
                  whileInView={"animate"}
                  viewport={{ once: true }}>
                    <li className="p-4 bg-pink-200 border-l-4 border-blue-700 shadow-sm">
                        <h6 className="font-bold">1. Get Your Invite Link</h6>
                        <p className="text-sm">Your teacher will send you a unique link—just click to join the classroom instantly, no complicated sign-up needed.</p>
                    </li>
                  </motion.div>
                  <motion.div
                   variants={FadeUp(0.4)}
                   initial="initial"
                   whileInView={"animate"}
                   viewport={{ once: true }}
                  >
                    <li className="p-4 bg-pink-200 border-l-4 border-blue-700 shadow-sm">
                        <h6 className="font-bold">2. Access the Live Whiteboard</h6>
                        <p className="text-sm">See real-time whiteboard updates as the lesson happens, while The Wightboard automatically captures everything for you.</p>
                    </li>
                  </motion.div>
                  <motion.div
                    variants={FadeUp(0.6)}
                    initial="initial"
                    whileInView={"animate"}
                    viewport={{ once: true }}
                  >
                    <li className="p-4 bg-pink-200 border-l-4 border-blue-700 shadow-sm">
                        <h6 className="font-bold">3. Revisit Past Lessons Anytime</h6>
                        <p className="text-sm">All whiteboard snapshots are saved in the room, so you can review previous lessons whenever you need.</p>
                    </li>
                  </motion.div>
                  <motion.div
                   variants={FadeUp(0.8)}
                   initial="initial"
                   whileInView={"animate"}
                   viewport={{ once: true }}
                  >
                    <li className="p-4 bg-pink-200 border-l-4 border-blue-700 shadow-sm">
                        <h6 className="font-bold">4. Stay Organized with Your Study Materials</h6>
                        <p className="text-sm">Easily switch between rooms for different subjects and find all your past lessons in one place.</p>
                    </li>
                  </motion.div>
              </ul>
          </div>
      </div>

      <section className="bg-pink-100 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-blue-700">About Us</h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
                  Education should be limitless. At <span className="font-semibold text-blue-700">Whiteboard</span>, we’re redefining how knowledge is shared and preserved. No more scrambling to take notes or losing valuable lessons—every whiteboard update
                  is captured effortlessly, so students stay focused and teachers teach without distractions.
              </p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                  Learning should flow, not feel like a race. With <span className="font-semibold text-blue-700">Whiteboard</span>, every lesson lives beyond the classroom, always accessible, always organized.
                  <span className="font-semibold text-blue-700">Whiteboard</span>
              </p>
              <p className="mt-6 text-gray-700 font-semibold">Simple. Seamless. Smart. Welcome to the future of learning.

              </p>
          </div>
      </section>

      </div>
    </section>
  );
}

export default Hero
