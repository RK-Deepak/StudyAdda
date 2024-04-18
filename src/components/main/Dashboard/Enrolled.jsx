import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import ProgressBar from '@ramonak/react-progress-bar';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { setUser } from '../../../store/Slices/profleSlice';

const Enrolled = () => {

  const {token}=useSelector((store)=>store.auth);
  const [enrolledCourses,setEnrolledCourses]=useState(null);
  const {user}=useSelector((store)=>store.profile)
const navigate=useNavigate();
const dispatch=useDispatch();
let addcourses=[];
  const getEnrolledCourses=async()=>
  {
    try 
    {
         const response=await getUserEnrolledCourses(token);
         console.log(response);

        
         setEnrolledCourses(response);
         for(let course of response)
         {
             addcourses.push(course._id);
         }
         console.log(addcourses);
         dispatch(setUser({...user,courses:addcourses}))
       
         
    }
    catch(error)
    {
      console.log("Unable to Fetch Enrolled Courses");
    }
  }

  useEffect(()=>
  {
    getEnrolledCourses();
  },[])



  return(
    <div className="w-[80%] mx-auto">
      <div className="text-3xl text-richblack-50 ">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3 text-sm md:text-lg" >Course Name</p>
            <p className="w-1/4 px-2 py-3 text-sm md:text-lg">Duration</p>
            <p className="flex-1 px-2 py-3 text-sm md:text-lg">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] flex-col md:flex-row items-baseline  cursor-pointer md:items-center gap-2 md:gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-full md:w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.duration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3 text-sm md:text-lg">
                <p>Progress: {course.progressPrecentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPrecentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Enrolled