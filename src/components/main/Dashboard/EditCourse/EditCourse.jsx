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
    
  
    ;(async () => {
      setloading(true);
      try {
        const details = await getCourseDetails({ courseId: courseId }, token);
        console.log(details);
        const updateDetails = {
          ...details?.courseDetails,
          tag: JSON.parse(details?.courseDetails?.tag),
          instructions: JSON.parse(details?.courseDetails.instructions)
        };
        console.log("this is update",updateDetails,details)
        dispatch(setEditCourse(true));
          setcourseDetails(updateDetails);
          dispatch(setCourse(updateDetails));
         
        
      } catch (error) {
        // Handle error if any
        console.log("Error fetching course details:", error);
      } finally {
        
          setloading(false);
        }
      
    })();
  
    return () => {
      // Cleanup function to cancel any pending tasks
    
      // Set course to null when unmounting
      dispatch(setCourse(null));
      dispatch(setEditCourse(false));
    };
  }, []);
  

  
  return (
    <div className='flex flex-col gap-4 w-full max-w-[1100px] mx-auto p-5'>
        <div className='flex gap-2 flex-col'>
        <p className='text-white text-md font-semibold'>Home{" "}/{" "}Dashboard{" "}/{" "}<span className=' text-red-300'>Edit Course</span></p>
                <h1 className='text-white  text-2xl '>Edit Course</h1>
            </div>
      <CourseCreation/>

    </div>
  )
}

export default EditCourse