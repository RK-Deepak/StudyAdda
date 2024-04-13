import React, { useEffect, useState } from 'react'
import {Outlet,useParams} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { getCourseDetails } from './../services/operations/courseAPI';
import {setCompletedLectures,setEntireCourseData,setCourseSectionData,setTotalNoOfLectures} from "../store/Slices/viewCourseSlice"
import VideoSideBar from '../components/main/VideoCourse/VideoSideBar ';
import CourseReviewModal from '../components/main/VideoCourse/CourseReviewModal';


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
         const courseData=await getCourseDetails({courseId:courseId},token);;
         console.log(courseData)
         dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
         dispatch(setEntireCourseData(courseData?.courseDetails));
         dispatch(setCompletedLectures(courseData?.completedVideos));
         let lectures=0;
         courseData?.courseDetails?.courseContent?.map((sec)=>lectures+=sec.subSection.length);
         dispatch(setTotalNoOfLectures(lectures))

}

setCourseDetaills();
},[])


  return (
    <>
    <div>
      {/* Video Side bar */}
      <VideoSideBar setReviewModal={setReviewModal}/>
          <div>
            {/* videos */}
            <Outlet/>
          </div>

    </div>
    {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse