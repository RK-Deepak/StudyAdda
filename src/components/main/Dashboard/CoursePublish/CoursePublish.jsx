import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEditCourse, setStep } from '../../../../store/Slices/courseSlice'

const CoursePublish = () => {
    const {course,editcourse}=useSelector((store)=>store.course)
    const dispatch=useDispatch()
    const handleback=()=>
    {
         dispatch(setStep(2));
         setEditCourse(true)
    }
  return (
    <div>
        <p onClick={handleback}>back</p>
    </div>
  )
}

export default CoursePublish