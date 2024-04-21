import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteCourse, getAllInstructorCoursesData } from '../../../../services/operations/courseAPI';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal2.jsx';
import { FaCheck,FaPlusCircle,FaRupeeSign } from "react-icons/fa";
import IconBtn from '../../common/IconBtn.jsx';

import MyCourseCard from './MyCourseCard.jsx';




const MyCourse = () => {
  const [allCourses, setAllCourses] = useState(null);
  const { token } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.profile);
  const [loading, setLoading] = useState();
  const [confirmationModal, setConfirmationModal] = useState(null);

  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [courseSearchText,setcourseSearchText] = useState("");
  const [filteredCourse,setfilteredCourse] = useState(null)

  
  
  const fetchingInstructorCourses = async () => {
    setLoading(true);
    let result = await getAllInstructorCoursesData({ instructorId: user._id }, token);
    console.log(result);
    setAllCourses(result?.courseDetails);
    
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

  const handleCourseSearchHandler = (e)=>
  {
       console.log(e.target.value);
       setcourseSearchText(e.target.value);
       const filteringdata=[...allCourses]
       const filteredCourse=filteringdata && filteringdata.filter((course)=>course.courseName.toLowerCase().includes(e.target.value.toLowerCase()));
       console.log(filteredCourse);
       setfilteredCourse(filteredCourse);
  
     
  }
//FOR DECIDIDING WHAT TO CHOOSE WHEN RENDER COURSE FILTER ONE OR TOTAL COURSES

const showCourselist=courseSearchText===""?allCourses:filteredCourse;
 
  


  return (
    <div className='flex flex-col gap-2 w-full sm:w-[80%] px-2 mx-auto'>
    <div className='flex flex-col gap-3'>
      <p className='text-white text-md font-semibold'>Home / Dashboard / <span className='text-red-300'>My Courses</span></p>
      <div className='flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center'>
        <p className='text-white text-xl'>My Courses</p>
        <form>
        
     
        <input
          required
          type="text"
          name="course"
          value={courseSearchText}
          onChange={handleCourseSearchHandler}
          placeholder="Search for Courses"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-yellow-800 p-[12px] text-richblack-5 text-[14px] sm:placeholder:text-[16px]"
        />
     
      </form>
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
          ) : 
          (
            
           showCourselist && showCourselist?.map((course) => {
            return (
             <div>
              <MyCourseCard course={course} confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal} handleCourseDelete={handleCourseDelete}/>
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
