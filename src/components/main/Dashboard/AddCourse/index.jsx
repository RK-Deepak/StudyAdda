import React from 'react'
import CourseCreation from './CourseCreation'
import Instruction from './Instruction'
export const CourseCreationProcess=()=>
{
    return( 
        <div className='flex flex-col gap-4 w-full max-w-[1100px] mx-auto p-5'>
      
      <div className='flex gap-2 flex-col'>
                <p className='text-white text-sm'>Home/Dashboard/Add Course</p>
                <h1 className='text-white  text-2xl '>Create Course</h1>
            </div>
       <div className='flex gap-2 w-full '>
         <CourseCreation/>
         <Instruction/>
         </div>
    </div>)
}