import React from 'react'

const Instruction = () => {

    const items = [
        "Set the Course Price option or make it free.",
        "Standard size for the course thumbnail is 1024x576.",
        "Video section controls the course overview video.",
        "Set the Course Price option or make it free.",
        "Standard size for the course thumbnail is 1024x576.",
        "Video section controls the course overview video.",
        "Set the Course Price option or make it free.",
        "Standard size for the course thumbnail is 1024x576."
    ];
  return (
    <div className='min-h-[370px] border-[1px] border-[#2C333F] p-[30px] flex flex-col gap-2 rounded-md w-full   md:w-fit '>
        <p className=' font-inter font-semibold text-[20px] text-richblack-25'>⚡Course Upload Tips</p>
        <ul className='flex gap-2 flex-col '>
            {items.map((item,index)=>
            {
             return   <li key={index} className='font-inter font-normal text-[14px] text-richblack-25 list-disc'>{item}</li>
            })}
        </ul>
    </div>
  )
}

export default Instruction