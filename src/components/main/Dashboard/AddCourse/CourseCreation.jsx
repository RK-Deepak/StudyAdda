import React from 'react'
import RenderSteps from './RenderSteps'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import CourseInformation from './CourseInformation/CourseInformation'
import CourseBuilderForm from '../CourseBuilder/CourseBuilderForm'
import CoursePublish from '../CoursePublish/CoursePublish'

const CourseCreation = () => {

const {step}=useSelector((store)=>store.course);

  
  return (
    <div className=' w-full md:w-[90%] px-2'>
      {/* //render steps */}
      <RenderSteps/>
      {/* //course creation form */}
      {step===1 && <CourseInformation/>}
      {step===2 && <CourseBuilderForm/>}
      {step===3 && <CoursePublish/>}
    </div>
  )
}

export default CourseCreation