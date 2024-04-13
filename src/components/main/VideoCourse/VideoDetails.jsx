import React ,{useEffect, useRef,useState}from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { markLectureAsComplete } from '../../../services/operations/courseAPI';
import { updateCompletedLectures } from '../../../store/Slices/viewCourseSlice';
import { Player } from 'video-react';
import { AiFillPlayCircle } from 'react-icons/ai';
import IconBtn from '../common/IconBtn';


const VideoDetails = () => {

  const {courseId,sectionId,subSectionId}=useParams();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const location=useLocation();
  const videoPlayerRef=useRef();

  const {token}=useSelector((store)=>store.auth);
  const {courseSectionData, courseEntireData, completedLectures}=useSelector((store)=>store.viewCourse)
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>
{
  const setVidoeSpecificDetails=async()=>
  {
    if(!courseSectionData?.length)
    {
     return
    }
    if(!courseId || !sectionId || !subSectionId)
    {
     navigate('/dashboard/enrolled-courses');
    }
    else 
    {
     //when all 3 field are present
     // so videodata set krenge
     const filterData=courseSectionData?.filter((data)=>data._id===sectionId);
      console.log(filterData)
     const filteedVideoData=filterData?.[0]?.subSection?.filter((data)=>data._id===subSectionId);
            console.log(filteedVideoData)
     setVideoData(filteedVideoData[0]);
     setVideoEnded(false);
    }
  }
      

       setVidoeSpecificDetails();
},[courseSectionData,courseEntireData,location.pathname,sectionId,subSectionId]);


const isFirstVideo=()=>
{
   
  const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId);

  const currentsubSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id===subSectionId);

  if(currentSectionIndex===0 && currentsubSectionIndex===0)
  {
    return true;
  }
  else 
  {
    return false
  }
}
const isLastVideo=()=>
{
   const currentSectionIndex=courseSectionData?.findIndex((data)=>data._id===sectionId);



const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length;

const currrentSubsectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id===subSectionId);

if(currentSectionIndex===courseSectionData.length-1 && currrentSubsectionIndex=== noOfSubSections-1 )
{
  return true;
}
else
{
  return false
}

}

const goToNextVideo=()=>
{
  const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId)

  const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length;

  const currentsubSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id===subSectionId);

  if(currentsubSectionIndex!==noOfSubSections-1)
  {
    //same section ke next video
    const nextSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSectionIndex+1]._id;
   
    navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
  }

  
  else 
  {
    //next section ke  first videovideo
        const nextSectionId=courseSectionData[currentSectionIndex+1]._id;
        const nextSubSectionId=courseSectionData[currentSectionIndex+1].subSection[0]._id
        navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
  }
}

const goToPreviousVideo=()=>
{
  const currentSectionIndex=courseSectionData.findIndex((data)=>data._id===sectionId)

  const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length;

  const currentsubSectionIndex=courseSectionData[currentSectionIndex].subSection.findIndex((data)=>data._id===subSectionId);


  if(currentsubSectionIndex!==0)
  {
    //same section ke next video
    const previousSubSectionId=courseSectionData[currentSectionIndex].subSection[currentsubSectionIndex-1]._id;

    navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${previousSubSectionId}`);
  }
  else 
  {
    //got to differnet section
    const prevSectionId=courseSectionData[currentSectionIndex-1]._id;

   const prevSubSectionLength=courseSectionData[currentSectionIndex-1].subSection.length;

   const prevSubSectionId=courseSectionData[currentSectionIndex-1].subSection[prevSubSectionLength-1]._id;

   navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
  }
}

const handleLectureComplete=async()=>
{
  setLoading(true);
  const result=await markLectureAsComplete({courseId: courseId, sectionId: sectionId, subSectionId:subSectionId},token);

  if(result)
  {
    dispatch(updateCompletedLectures(subSectionId));
  }
  setLoading(false);
}

  
  return (
    <div>
      {
        !videoData ? <div> No Data Found</div>:
        <Player ref={videoPlayerRef}
        playsInline
        aspectRatio='16:9'
        onEnded={()=>setVideoEnded(true)}
        src={videoData?.videoURL}>

        <AiFillPlayCircle/>
        {
          videoEnded && (
            <div>
              {
                !completedLectures.includes(subSectionId) &&
              <IconBtn disabled={loading} onclick={()=>handleLectureComplete()}
              text={
                !loading ?"Mark As Completed":"Marking"
              }

              />

              }
              <IconBtn 
              disabled={loading}
              onclick={()=>{
                if(videoPlayerRef.current)
                {
                  //video from 0 point
                  videoPlayerRef.current.seek(0);
                  setVideoEnded(false)
                }
              
              }} 
              text="Rewatch"
              customClasses="text-xl"/>

              <div>
                {!isFirstVideo() && (
                  <button disabled={loading}
                  onClick={goToPreviousVideo}
                  className='blackButton'
                  >Prev</button>
                )}
                {!isLastVideo() && (
                  <button disabled={loading}
                  onClick={goToNextVideo}
                  className='blackButton'
                  >Next</button>
                )}
              </div>
            </div>
          )
        }
        </Player>
      }
      <h1 className='text-white'>
        {videoData?.title}
      </h1>
      <p className='text-white'>{
        videoData.description
}</p>
    </div>
  )
}

export default VideoDetails