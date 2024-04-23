import React from 'react'
import { formatDate } from '../../../../utils/dateFormatter';
import { COURSE_STATUS } from "../../../../utils/contants.js";
import { HiClock } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import {MdDelete} from "react-icons/md"
import convertSecondsToDuration from '../../../../utils/secToDuration.js';
import { FaCheck,FaRupeeSign } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyCourseCard = ({course,setConfirmationModal,handleCourseDelete}) => {
   
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const description_length = 35;

    
    let totalDurationInSeconds=0
    course.courseContent.forEach((content)=>
    {
      content.subSection.forEach((subSection)=>
      {
        const timeDurationInSeconds=parseInt(subSection.duration);
        totalDurationInSeconds+=timeDurationInSeconds
      })
    })
    const totalDuration=convertSecondsToDuration(totalDurationInSeconds);
    console.log(totalDuration)

  return (
    <div key={course._id} className="flex flex-col sm:flex-row gap-x-10  border-b border-richblack-300 px-6 py-8 w-full">
                <div className="flex flex-1 gap-x-4 w-full md:flex-row flex-col gap-2">
                  <img
                    src={course.thumbnail}
                    alt="course/thumbnail"
                    className="sm:h-[148px] w-full sm:w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex justify-between  flex-col  gap-2">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.split(" ").length > description_length ?
                        course.courseDescription.split(" ").slice(0, description_length).join(" ") + "...."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created At: {formatDate(course.createdAt)}
                    </p>
                    <p className="text-[12px] text-white">
                      Language: {course.language}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm font-medium text-richblack-100 my-1">
                  {totalDuration}
                </p>
                <p className="text-sm font-medium text-richblack-100 my-1">
                  <div className='flex gap-1 items-center'>
                    <FaRupeeSign /><span>{course.price}</span>
                  </div>
                </p>
                <div className="text-sm font-medium  text-richblack-100 my-1">
                  <button
                    disabled={loading}
                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                    title='Edit'
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-pink-300"
                  >
                    <FiEdit3 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => setConfirmationModal({
                      text1: "Do you want to delete this course?",
                      text2: "All the data related to this course will be deleted",
                      btn1Text: !loading ? "Delete" : "Loading...  ",
                      btn2Text: "Cancel",
                      btn1Handler: !loading ?
                        () => handleCourseDelete(course._id, course?.category._id) :
                        () => { },
                      btn2Handler: !loading ?
                        () => setConfirmationModal(null) :
                        () => { },
                    })}
                    title='Delete'
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
  )
}

export default MyCourseCard