import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setEditCourse, setStep } from '../../../../store/Slices/courseSlice'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import IconBtn from '../../common/IconBtn'
import { COURSE_STATUS } from '../../../../utils/contants'
import toast from 'react-hot-toast'
import { editCourseDetails } from '../../../../services/operations/courseAPI'

const CoursePublish = () => {
    const {course,editcourse}=useSelector((store)=>store.course)
    const dispatch=useDispatch();
    const {register,handleSubmit,formState:{errors},setValue,getValues}=useForm();
    const navigate=useNavigate();
    const [loading,setloading]=useState(false);
   
    const {token}=useSelector((store)=>store.auth)

     useEffect(()=>
     {
        if(course.status===COURSE_STATUS.PUBLISHED)
        {
          setValue("public",true)
        }
     },[])

    const goback=()=>
    {
         dispatch(setStep(2));
         setEditCourse(true)
    }

    const gotoCourses=()=>
    {
      dispatch(resetCourseState());
      navigate("/dashboard/my-courses");
    }

    const handleCoursePublishement=async (data)=>
    {
       //check if course is already in published state or checkbox is clicked or not
       if(course.status===COURSE_STATUS.PUBLISHED && getValues("public")===false)
       {
        //no nedd to update the courses
         gotoCourses();
         return;
       }
       setloading(true)
       const formData=new FormData();
       formData.append("courseId",course._id);
       const courseStatus=getValues("public")?COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT;
       formData.append("status",courseStatus)

       //make an api call 
       const response=await editCourseDetails(formData,token);
       if(response)
       {
        gotoCourses();

       }
       setloading(false)
    }
    const onSubmitForm=async(data)=>
    {
        
        handleCoursePublishement(data)
        
    }
   
  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
    <p className="text-2xl font-semibold text-richblack-5">
      Publish Settings
    </p>
    <form onSubmit={handleSubmit(onSubmitForm)}>
      {/* Checkbox */}
      <div className="my-6 mb-8">
        <label htmlFor="public" className="inline-flex items-center text-lg">
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
          />
          <span className="ml-2 text-richblack-400">
            Make this course as public
          </span>
        </label>
      </div>

      {/* Next Prev Button */}
      <div className="mx-auto sm:ml-auto flex max-w-max items-center gap-[10px] sm:gap-x-4 flex-col  sm:flex-row">
     
        <button
          disabled={loading}
          type="button"
          onClick={goback}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
        >
           <MdArrowBack/>
          Back
        </button>
        <IconBtn disabled={loading} text="Save Changes" />
      </div>
    </form>
  </div>
  )
}

export default CoursePublish