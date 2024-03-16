import React from 'react'

const CoursePoint = ({image,heading,subheading}) => {
  return (
    <div className='flex gap-3 items-center '>
      <div className='bg-white rounded-full p-[4px]  shadow w-[40px] flex justify-center items-center aspect-square'>
         <img src={image} alt='pointimage' className='w-[20px] aspect-square'/>
         </div>
         <div className='flex flex-col gap-[2px] '>
          <span className='text-[16px] font-semibold font-inter'>{heading}</span>
          <span className='text-[12px] font-normal font-inter'>{subheading}</span>
         </div>
    </div>
  )
}

export default CoursePoint