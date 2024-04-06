import React, { useState,useEffect } from 'react'
import RenderSteps from "../../../main/Dashboard/AddCourse/RenderSteps.jsx"
import { useParams } from 'react-router-dom';
import { getCourseDetails } from '../../../../services/operations/courseAPI.js';
import { useDispatch, useSelector } from 'react-redux';
import CourseCreation from '../AddCourse/CourseCreation.jsx';
import { setCourse,setEditCourse,resetCourseState } from '../../../../store/Slices/courseSlice.js';

const EditCourse = () => {
  
  const {courseId}=useParams();
  const [courseDetails,setcourseDetails]=useState(null);
  const {token}=useSelector((store)=>store.auth)
  const dispatch=useDispatch();
  const [loading,setloading]=useState(false)
  console.log(courseId);

  useEffect(() => {
    let isMounted = true;
  
    (async () => {
      setloading(true);
      try {
        const details = await getCourseDetails({ courseId: courseId }, token);
        const updateDetails = {
          ...details[0],
          tag: JSON.parse(details[0]?.tag),
          instructions: JSON.parse(details[0].instructions)
        };
        if (isMounted) {
          setcourseDetails(updateDetails);
          dispatch(setCourse(updateDetails));
          dispatch(setEditCourse(true));
        }
      } catch (error) {
        // Handle error if any
        console.error("Error fetching course details:", error);
      } finally {
        if (isMounted) {
          setloading(false);
        }
      }
    })();
  
    return () => {
      // Cleanup function to cancel any pending tasks
      isMounted = false;
      // Set course to null when unmounting
      dispatch(setCourse(null));
      dispatch(setEditCourse(false));
    };
  }, []);
  

  
  return (
    <div className='flex flex-col gap-4 w-full max-w-[1100px] mx-auto p-5'>
        <div className='flex gap-2 flex-col'>
                <p className='text-white text-sm'>Home/Dashboard/Edit Course</p>
                <h1 className='text-white  text-2xl '>Edit Course</h1>
            </div>
      <CourseCreation/>

    </div>
  )
}

export default EditCourse