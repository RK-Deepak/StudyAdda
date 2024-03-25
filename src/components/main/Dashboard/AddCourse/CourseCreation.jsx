import React from 'react'
import RenderSteps from './RenderSteps'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import CourseInformation from './CourseInformation'

const CourseCreation = () => {


  
  return (
    <div className='w-[90%] px-2'>
      {/* //render steps */}
      <RenderSteps/>
      {/* //course creation form */}
      <CourseInformation/>
    </div>
  )
}

export default CourseCreation