import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteCourse, getAllInstructorCoursesData } from '../../../../services/operations/courseAPI';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { formatDate } from '../../../../utils/dateFormatter';
import { COURSE_STATUS } from "../../../../utils/contants.js";
import { HiClock } from "react-icons/hi";
import { FiEdit, FiEdit3 } from "react-icons/fi";
import {MdDelete} from "react-icons/md"
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal2.jsx';
import { FaCheck,FaPlusCircle,FaRupeeSign } from "react-icons/fa";
import IconBtn from '../../common/IconBtn.jsx';
import { setEditCourse } from '../../../../store/Slices/courseSlice.js';


const MyCourse = () => {
  const [allCourses, setAllCourses] = useState(null);
  const { token } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.profile);
  const [loading, setLoading] = useState();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [categoryId,setCategoryId]=useState(null)
  const description_length = 35;
  const navigate = useNavigate();
  const dispatch=useDispatch();
  
  const fetchingInstructorCourses = async () => {
    setLoading(true);
    let result = await getAllInstructorCoursesData({ instructorId: user._id }, token);
    console.log(result);
    setAllCourses(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchingInstructorCourses();
  }, []);

  const handleCourseDelete = async (courseId,categoryId) => {
    console.log(courseId,categoryId,user._id)
    // Implement your course deletion logic here
   
    await deleteCourse({courseId,categoryId,instructorId:user._id},token);
    setConfirmationModal(null)

    fetchingInstructorCourses();
  };
  


  return (
    <div className='flex flex-col gap-2 w-full sm:w-[80%] px-2 mx-auto'>
    <div className='flex flex-col gap-3'>
      <p className='text-white text-md font-semibold'>Home / Dashboard / <span className='text-red-300'>My Courses</span></p>
      <div className='flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center'>
        <p className='text-white text-xl'>My Courses</p>
        <IconBtn outline={true} onclick={() => navigate("/dashboard/add-course")} text={"Add Course"}>
          <div className='flex gap-1 items-center text-white'>
            <FaPlusCircle />
          </div>
        </IconBtn>
      </div>
    </div>
    <div>
      <div>
        <div className="hidden gap-x-10 text-white rounded-t-md border-b border-b-richblack-800 px-6 py-2 md:flex">
       
          <p className="flex-1 text-left text-sm font-medium uppercase md:flex text-white md:text-richblack-100">
            Courses
          </p>
          <p className="text-left text-sm font-medium uppercase text-richblack-100">
            Duration
          </p>
          <p className="text-left text-sm font-medium uppercase text-richblack-100">
            Price
          </p>
          <p className="text-left text-sm font-medium uppercase text-richblack-100">
            Actions
          </p>
        </div>
        
      </div>
      {!loading ?
        <div>
          {allCourses && allCourses.length === 0 ? (
            <div>
              <p className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
              </p>
            </div>
          ) : (allCourses && allCourses.map((course) => {
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
                  2hr 30min
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
                    title='delete'
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            );
          }))
          }
        </div> : <div className="loader w-full mx-auto min-h-screen my-auto"></div>}
    </div>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
  </div>

  )
}

export default MyCourse;
