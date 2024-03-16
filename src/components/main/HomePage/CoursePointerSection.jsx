import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import CoursePoint from '../../../components/main/HomePage/CoursePoint';
import flexiImage from "../../../assets/Images/flexiImage.jpg"

const CoursePointerSection = () => {
    const CoursePointers=[
        {
            image:Logo1,
            heading:"Leadership",
            subheading:"Fully committed to the success company"

        },
        {
            image:Logo2,
            heading:"Responsibility",
            subheading:"Students will always be our top priority"

        },
        {
            image:Logo3,
            heading:"Flexibility",
            subheading:"The ability to switch is an important skills"

        },
        {
            image:Logo4,
            heading:"Solve The Problem",
            subheading:"Code your way to a solution"

        },

    ]
  return (
    <div className='flex flex-wrap justify-around p-10
    my-4 relative'>
      {/* part-3 left */}
      <div className='flex flex-col gap-1 my-4'>
    {CoursePointers.map((pointer, index) => {
      return (
        <div key={index}>
          <CoursePoint image={pointer.image} heading={pointer.heading} subheading={pointer.subheading} />
         {index!==CoursePointers.length-1 && <div className='border border-dotted border-richblack-200 w-[1px] h-[44px] relative left-[18px] rotate-180'></div>}
        </div>
      );
    })}
  </div>
  
              {/* part-3 right */}
             
              <div className='w-[300px] md:w-full md:max-w-[50%] p-7 relative z-0 '>
                  {/* //shadow */}
              <div className='gradient-box'></div>
             <img src={flexiImage} alt='flexiImage' className=' h-[200px] w-[300px] md:h-full  md:w-full rounded-md ' />
             <div className='bg-[#014A32] absolute p-[4px] sm:p-[16px] flex flex-wrap gap-[20px] md:gap-[52px] rounded-md  left-16 right-[3.5rem] -bottom-4'>
              <div className='flex font-inter gap-[2px] sm:gap-2 items-center  flex-wrap'>
                  <span className='font-bold text-lg  md:text-[36px] text-white' >10</span>
                  <span className='font-semibold text-[10px] md:text-[14px] text-green-200'>YEARS EXPERIENCE</span>
              </div>
              <div className='flex font-inter gap-[2px] sm:gap-2 flex-wrap items-center'>
                  <span className='font-bold text-lg md:text-[36px] text-white' >200+</span>
                  <span className='font-semibold text-[10px] md:text-[14px] text-green-200'>COURSES</span>
              </div>
             </div>
              </div>
              
              </div>
  )
}

export default CoursePointerSection