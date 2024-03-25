import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import ProgressBar from '@ramonak/react-progress-bar';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';

const Enrolled = () => {

  const {token}=useSelector((store)=>store.auth);
  const [enrolledCourses,setEnrolledCourses]=useState(null);

  const getEnrolledCourses=async()=>
  {
    try 
    {
         const response=await getUserEnrolledCourses(token);
         setEnrolledCourses(response)
    }
    catch(error)
    {
      console.log("Unable to Fetch Enrolled Courses");
    }
  }

  useEffect(()=>
  {
    getEnrolledCourses();
  },[token])

  const dummycousrses=[
    {
        courseName:"Webdev",
        thumbnail:"img",
        courseDescription:"sdasmdaskdmasd",
        totalDuration:"2h 30mins",
        progressPercentage:"65%"
    },
    {
        courseName:"Webdev",
        thumbnail:"img",
        courseDescription:"sdasmdaskdmasd",
        totalDuration:"2h 30mins",
        progressPercentage:"65%"
    },
]

const tabs=[
  "All","Completed","Pending"
]
  return (
    <div className='flex flex-col gap-4 w-full max-w-[900px] mx-auto p-5'>
      
      <div className='flex gap-2 flex-col'>
                <p className='text-white text-sm'>Home/Dashboard/Profile</p>
                <h1 className='text-white  text-2xl '>Enrolled Courses</h1>
            </div>
    {
        !dummycousrses? (<div className='loader left-[50%]'>
          
        </div>)
        : !dummycousrses.length ? (<p>You have not enrolled in any course yet</p>)
        : (
            <div>
            {/* buttons */}
                <div className='mt-5 -mb-[3.5rem] sm:my-5 flex sm:flex-row rounded-full bg-richblack-800  border-richblack-100
      sm:px-1 sm:py-1 flex-wrap flex-col p-[23px] sm:p-[40px]  justify-between relative underline md:no-underline items-center sm:items-stretch  w-fit'>
        {
          tabs.map((element,index)=>
          {
            return <div key={index}  className={`text-[16px] flex flex-row items-center gap-2 
           
            ? "bg-richblack-900 text-richblack-5 font-medium"
            : "text-richblack-200" } rounded-full transition-all duration-200 cursor-pointer
            hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} >
            
              {element}
          
            </div>
          })
        }
     

        </div>
                {/* Cards shure hote h ab */}
                <div className='flex justify-between bg-richblack-50 min-h-[30px] p-4 items-center my-2'>
                        <p>Course Name</p>
                        <p>Durations</p>
                        <p>Progress</p>
                    </div>
                <div className='flex flex-col gap-2'>
                {
                    dummycousrses.map((course,index)=> (
                        <div className='flex justify-between bg-richblack-50 min-h-[150px] p-4 items-center'>
                            <div className="flex gap-2 items-center">
                                <img  src={course.thumbnail}/>
                                <div className='flex flex-col gap[2px]'>
                                    <p>{course.courseName}</p>
                                    <p>{course.courseDescription}</p>
                                </div>
                            </div>

                            <div>
                                {course?.totalDuration}
                            </div>

                            <div>
                                <p>Progress: {course.progressPercentage || 0}%</p>
                                <ProgressBar
                                    completed={course.progressPercentage || 0}
                                    height='8px'
                                    isLabelVisible={false}
                                    />
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        )
    }
  
</div>
  )
}

export default Enrolled