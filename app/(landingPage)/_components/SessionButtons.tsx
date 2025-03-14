import React from 'react'
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const SessionButtons = () => {
  return (
    <div>
        <div className='space-y-10 m-24 '>
            <div className='bg-[#8567d8bd] max-w-80 rounded-full py-1 px-15 text-lg flex justify-center items-center  max-h-15 relative z-20'>
            <button aria-label="Start a new session"  className="text-slate-50 flex items-center space-x-2 relative py-1 ">
                <FaPlus className='text-xl'/>
                <span>New session</span>
            </button>
            </div>
            <div className='bg-[#8567d8bd] max-w-80 rounded-full py-1 px-15 text-lg flex justify-center items-center min-h-[45px] max-h-15 relative z-20'>
            <button className="text-slate-50 flex items-center space-x-2 ">
                <FaChalkboardTeacher className='text-xl ' />
                <span>join session</span>
            </button>
            </div>
        </div>
    </div>
  )
}

export default SessionButtons
