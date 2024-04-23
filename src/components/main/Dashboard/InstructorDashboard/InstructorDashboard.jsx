import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { getInstructorDashboardDetails } from '../../../../services/operations/profileAPI';
import { MdAdd } from 'react-icons/md';
import CourseCard from '../../../CategoryCourses/CourseCard';
import { useNavigate } from 'react-router-dom';
import InstructorChar from '../Settings/InstructorChar';

const InstructorDashboard = () => {

    const {token}=useSelector((store)=>store.auth);
    const navigate=useNavigate();
   
    const [allCourse,setallCourse]=useState([]);
    const {user}=useSelector((store)=>store.profile);

    const totalCourse=allCourse?.length;
    const totalStudents=allCourse?.reduce((acc,curr)=>acc+curr.studentEnrolled.length,0);
    const totalIncome=allCourse?.reduce((acc,curr)=>acc+(curr.studentEnrolled.length*curr.price),0);


   useEffect(()=>
{ 

    const fetchingInsturctorInfo=async()=>
    {
          const response =await getInstructorDashboardDetails(token);
          setallCourse(response)

           
          console.log(response);
    }
fetchingInsturctorInfo();
},[])

function handleViewCourse()
{
      navigate("/dashboard/my-courses");
}






  return (
    <div className='flex flex-col gap-5 w-full max-w-[1100px] mx-auto p-5 text-white font-inter'>
        {/* Section-1 */}
        <div className='flex border border-richblack-50 rounded-md p-5 justify-between min-h-[150px] items-center bg-richblack-800 flex-wrap'>
            <div className='flex flex-col gap-2 '>
            <p className=' text-3xl font-bold'>Hey,Guru...😊</p>
            <p className=' text-richblack-300 font-semibold '>{user.firstName} {user.lastName}  </p>
            </div>
            <div>
                <img src={user.profileImage} alt='Profile'
                 className='hidden md:block w-[60px] aspect-square rounded-full'/>
            </div>
        </div>
        {/* Section-2 */}
        <h1 className=' text-2xl underline font-bold'>Statistics</h1>
        <div className='flex gap-2  bg-richblack-800  min-h-[300px] border   border-richblack-50 rounded-md p-5 justify-center lg:justify-between flex-wrap  '>
     
            <div className='flex flex-col border border-richblack-400 p-4 min-w-[300px] gap-2 rounded-md'>
            
            <div className='flex flex-col gap-2'>
                <p className=' text-2xl font-bold'>Total Courses</p>
                <p className=' text-xl  font-bold text-yellow-50'>{totalCourse}</p>
            </div>
            <div className='flex flex-col gap-2'>
                <p  className=' text-2xl font-bold'>Total Students</p>
                <p className=' text-xl  font-bold text-yellow-50'>{totalStudents}</p>
            </div>
            <div className='flex flex-col gap-2'>
                <p  className=' text-2xl font-bold'>Total Income</p>
                <p className=' text-xl  font-bold text-yellow-50'>Rs.{totalIncome}</p>
            </div>
            </div>
            {/* //stat. graph */}
      <InstructorChar courses={allCourse}/>
        </div>
        {/* Section-4 */}
        <div className='flex flex-col gap-2'>
            <div className='flex justify-between'>
            <h1 className=' text-2xl underline font-bold'>Courses</h1>
            <p className='text-green-300 cursor-pointer' onClick={handleViewCourse}>View All Courses</p>
            </div>
            {allCourse?.length>0?
            <div className='flex flex-col lg:flex-row items-center lg:justify-between gap-4 border border-richblack-50 rounded-md p-2 bg-richblack-800 '>
               {allCourse?.slice(0,3).map((eachcourse,index)=>
            {
                return <>
                    <CourseCard course={eachcourse} show={false} key={index}/>
                </>
            })}
            </div>
            :<div>
                <p>"No Course Is Yet Created"</p>
                <div className='p-2 bg-green-600 text-white w-fit rounded-full '>
                    <MdAdd className='text-xl'/>
                </div>
                </div>
            }
        </div>
    </div>
  )
}

export default InstructorDashboard