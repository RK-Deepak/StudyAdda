import React, { useEffect, useState } from 'react'
import {Outlet,useParams} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { getCourseDetails } from './../services/operations/courseAPI';
import {setCompletedLectures,setEntireCourseData,setCourseSectionData,setTotalNoOfLectures} from "../store/Slices/viewCourseSlice"
import VideoSideBar from '../components/main/VideoCourse/VideoSideBar ';
import CourseReviewModal from '../components/main/VideoCourse/CourseReviewModal';
import { completedVideosdata } from './../services/operations/courseAPI';


const ViewCourse = () => {

  const [reviewModal,setReviewModal]=useState(false);

  const {courseId}=useParams();
  console.log("hi i m",courseId)

  const {token}=useSelector((store)=>store.auth);

  const dispatch=useDispatch();

  useEffect(()=>
{
  const setCourseDetaills=async ()=>
{
         const courseData=await getCourseDetails({courseId:courseId},token);
         const response =await completedVideosdata(courseId,token);
         console.log("hi i m",courseData)
         dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
         dispatch(setEntireCourseData(courseData?.courseDetails));
         dispatch(setCompletedLectures(response?.data?.data));
         let lectures=0;
         courseData?.courseDetails?.courseContent?.map((sec)=>lectures+=sec.subSection.length);
         dispatch(setTotalNoOfLectures(lectures))

}

setCourseDetaills();
},[]);
// useEffect(()=>
// {
//   async function fetchCompletedVideos()
//   {
    
//     console.log("hi i m again ",response);
//     dispatch(setCompletedLectures(response?.data?.data?.length));

//   }
      
//         fetchCompletedVideos();
// },[courseId,token])




  return (
    <>
    <div className="relative flex  min-h-[calc(100vh-3.5rem)] flex-col md:flex-row gap-[10px] md:gap-2">
      {/* Video Side bar */}
      <VideoSideBar setReviewModal={setReviewModal}/>
          <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
            <div className='mx-6'>
            {/* videos */}
            <Outlet/>
            </div>
          </div>

    </div>
    {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse