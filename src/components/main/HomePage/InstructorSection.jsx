import React from 'react'

import CodeBlocks from './CodeBlocks'
import HighlightText from './HighlightText'
import InstructorX from "../../../assets/Images/Instructor.png"
import love from "../../../assets/Images/love.jpg"

const InstructorSection = () => {
  return (
    <div className='flex   mx-auto gap-10 sm:gap-20 flex-wrap md:flex-row lg:justify-between justify-center p-10' >
            {/* section-3-left */}
           <div className='flex flex-wrap justify-between 
  my-4 relative  z-0 w-[90%]  sm:max-w-[500px]  items-center shadow '>
              <div className='flex relative flex-col  md:flex-row ' >
              <img src={InstructorX} alt='instructor' className=' -rotate-12 w-[250px] rounded-md shadow shadow-green-500'/>
              <img src={love} alt='instructor' className=' rotate-12 w-[250px] rounded-md shadow shadow-green-500'/>
              </div>
             
           </div>
           {/* /section-3-right */}
           <div className='max-w-[500px]  w-full mx-auto shadow shadow-green-600 rounded-md p-5 '>
                <CodeBlocks position={"flex-col  items-center w-[100%] mt-0 sm:mt-20"} heading={
                    <div className='text-xl lg:text-4xl font-semibold flex items-center gap-2 text-white '>
                    Be A
                     <HighlightText text={"Guru"} textanimationshow={false}/>
                    </div>

                }
                subheading={
                    "Instructors from around the world teach millions of students on StudyAdda. We provide the tools and skills to teach what you love."
                }
                codebtn1={
                    {
                        btnText:"Start Teaching Today",
                        linkto:"/signup",
                        active:true
                    }
                }
               
             
                >
           </CodeBlocks>

                
                
            </div>
         </div>
  )
}

export default InstructorSection