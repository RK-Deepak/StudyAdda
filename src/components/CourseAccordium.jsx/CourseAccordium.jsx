import React,{useState} from 'react'
import { FaCaretDown,FaCaretUp, FaTv } from 'react-icons/fa';

const CourseAccordium = ({courseDetails}) => {

    //total Section
    const totalSections=courseDetails?.courseContent.length;
    const {courseContent}=courseDetails;
    const [showSubSection,setshowSubSection]=useState(false);
    const [showIndex,setshowIndex]=useState(null)
  
  //total SubSection
    const totalLectures=courseContent.reduce((acc,section)=>
    {
        const numberOfSubSection=section.subSection.length;
          return numberOfSubSection+acc;
    },0)
    console.log(totalLectures)
  
   //totalDuration of lecture

   
   let totalSubSection = [];
   courseContent.forEach((section, index) => totalSubSection.push(...section.subSection)); // Flatten the array
   
   let totalCourseDurationInSeconds = totalSubSection.reduce((acc, curr) => {
       const durationInSeconds = parseInt(curr.duration) || 0; // Assuming duration is in seconds
       return acc + durationInSeconds;
   }, 0);
   
   totalCourseDurationInSeconds = Math.round(totalCourseDurationInSeconds);
   
   const totalCourseDurationInMinutes = Math.floor(totalCourseDurationInSeconds / 60);
   const hours = Math.floor(totalCourseDurationInMinutes / 60);
   const minutes = totalCourseDurationInMinutes % 60;
   const seconds = totalCourseDurationInSeconds % 60;


   function hadnleSubSectionExplore(index)
   {
    setshowIndex(index);
    if(showIndex===index)
    {
        setshowSubSection(prev=>!prev)
    }

   }
   function formatDuration(duration) {
    if (duration < 60) {
        return duration.toFixed(2) + " seconds";
    } else if (duration < 3600) {
        return (duration / 60).toFixed(2) + " minutes";
    } else {
        return (duration / 3600).toFixed(2) + " hours";
    }
}




   
  
     
      

  return (
    <div className='w-full flex flex-col gap-3'>
        <div className='flex justify-between  items-center w-full'>
        <div className='flex gap-2 font-inter text-[12px] font-semibold text-richblack-50'>
            <p>{totalSections}{" "}Sections</p>
            <p>.{" "}{totalLectures} lectures</p>
            <p>.{" "}{hours}hrs {minutes}mins {seconds}secs  total length</p>
            
        </div>
        <div className=' font-inter text-[12px]  text-yellow-25 '>
               Collapse All Sections
        </div>
        </div>
        <div className='flex flex-col gap-2'>
            {
               courseDetails?.courseContent?.map((course,index)=>
               {
                return <div key={course._id} className='w-full    '>
                <div className='  min-h-[30px] bg-richblack-500 justify-between p-3 rounded-md border border-richblack-25' >
                    <div className='flex items-center gap-1 justify-between w-full ' onClick={()=>hadnleSubSectionExplore(index)}>
                        <div className='flex items-center gap-1 '>
                        {showSubSection?<FaCaretUp/>:<FaCaretDown/>}
                    <p>{course.sectionName}</p>
                    </div>
                     <p>{course.subSection.length} lectures</p>
                    </div>
                   

                   {showSubSection && showIndex===index && <div className=" bg-richblack-800 text-green-500 transition-all duration-200 p-2 rounded-sm">
                        {
                            course?.subSection?.map((subSection,index)=>
                            {
                                return <div key={index}>
                                   
                                  
                                  
                                  
                                        <details>
                                              <summary className='flex gap-3 items-center'> 
                                              <div className='flex items-center justify-between w-full '>
                                   <span className='flex gap-2 items-center'><FaTv/>{subSection.title} </span>
                                   <span>{formatDuration(parseInt(subSection?.duration))}</span>
                                   </div>
                                            </summary>
                               <span className='px-2 underline'> {subSection.description} </span>
                                          </details>
                                </div>
                            })
                        }
                    </div>}
                   
                    </div>
                   
                </div>
               })
            }
        </div>
    </div>
  )
}

export default CourseAccordium