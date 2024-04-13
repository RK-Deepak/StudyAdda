import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IconBtn from '../common/IconBtn';




const VideoSideBar  = ({setReviewModal}) => {
    //for section 
    const [activeStatus,setActiveStatus]=useState("");
    //for subsection
    const [videobarActive,setVideoBarActive]=useState("");
    const navigate=useNavigate();
    const {sectionId,subSectionId}=useParams();
    const location=useLocation();

    const { courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures}=useSelector((store)=>store.viewCourse)

    console.log(courseSectionData,courseEntireData,completedLectures,totalNoOfLectures)
        useEffect(()=>
       {
        ;(()=>
            {
               if(!courseSectionData?.length)
               {
                return;
               } 
               //find current index for highlighting section
               const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId);

               console.log(currentSectionIndex)

               //the ssubsection which is active
               const currentsubSectionIndex=courseSectionData[currentSectionIndex]?.subSection?.findIndex((data)=>data._id===subSectionId);

               console.log(currentsubSectionIndex);
               //now we will highlight the active portion
               const activeSubSectionId=courseSectionData[currentSectionIndex]?.subSection[currentsubSectionIndex]?._id;

               console.log(activeSubSectionId)
               //set current section here
               setActiveStatus(courseSectionData[currentSectionIndex]?._id);
               //set current subsection here
               setVideoBarActive(activeSubSectionId)

         
            })();
        },[courseSectionData,courseEntireData,location.pathname])
    
  return (
    <>
     <div className='text-white'>
        {/* for buttons and heading */}
        <div>
        <div onClick={()=>navigate("/dashboard/enrolled-courses")}>
            Back
            </div> 

        <div>
            <IconBtn text="Add Review" onclick={()=>setReviewModal(true)}/>
            </div>   
        </div>
        <div>
            <p>{courseEntireData?.courseName}</p>
            <p>{completedLectures?.length}/{totalNoOfLectures}</p>
        </div>
d
        {/* for section and subsections */}
        <div>
            {
                courseSectionData && courseSectionData?.map((section,index)=>(
                    <div onClick={()=>setActiveStatus(section._id)}
                    key={index}
                    >
                    {/* section */}
                    <div>
                        <div>{section?.sectionName}
                        </div>
                    </div>
                    {/* SUBSECTION */}
                    <div>
                        {
                            activeStatus===section._id && (
                                <div>
                                    {
                                section?.subSection?.map((topic,index)=>
                            (
                                <div className={`flex gap-4 p-5  ${videobarActive===index?"bg-yellow-25":"bg-richblack-500 text-red-500"} `} key={index} onClick={()=>{
                                    navigate(`/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${topic._id}`)
                                    setVideoBarActive(topic._id);
                                }} >
                                    <input type='checkbox' checked={completedLectures.includes(topic._id)} onChange={()=>{}}/>
                                    <span>{topic.title}</span>
                                </div>
                            ))
                                    }
                               
                                </div>
                            )
                        }
                    </div>
                    </div>
                ))
            }
        </div>
      
      </div>
    </>
   
  )
}

export default VideoSideBar 