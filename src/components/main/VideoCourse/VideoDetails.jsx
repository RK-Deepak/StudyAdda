import React ,{useEffect, useRef,useState}from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { markLectureAsComplete } from '../../../services/operations/courseAPI';
import { updateCompletedLectures } from '../../../store/Slices/viewCourseSlice';
import { Player,BigPlayButton } from 'video-react';
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
  const [previewSource, setPreviewSource] = useState("")
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
     
     const filteedVideoData=filterData?.[0]?.subSection?.filter((data)=>data._id===subSectionId);
           
     setVideoData(filteedVideoData?.[0]);
     setPreviewSource(courseEntireData?.thumbnail);
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

// useEffect(()=>
// {
//   const intitalMarking=async()=>
//   {
//     const result=await markLectureAsComplete({courseId: courseId, sectionId: sectionId, subSectionId:subSectionId},token);
    
//   if(result)
//   {
//     dispatch(updateCompletedLectures(subSectionId));

//   } 
//   }
  

//   intitalMarking();

// },[])


  
  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={videoPlayerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoURL}
        >
          <BigPlayButton position="center" />
          {/* Render When Video Ends */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={() => handleLectureComplete()}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconBtn
                disabled={loading}
                onclick={() => {
                  if (videoPlayerRef?.current) {
                    // set the current time of the video to 0
                    videoPlayerRef?.current?.seek(0)
                    setVideoEnded(false)
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPreviousVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails