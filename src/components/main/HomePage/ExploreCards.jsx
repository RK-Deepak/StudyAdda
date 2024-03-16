import React, { useEffect } from 'react'
import { FaNetworkWired} from 'react-icons/fa'
import {MdPeople} from "react-icons/md"


const ExploreCards = ({selectedCourses,currentCard,setcurrentCard}) => {

    useEffect(()=>
    {
       setcurrentCard(selectedCourses[0])
    },[selectedCourses])
    const chooseHandler=(course)=>
    {
        setcurrentCard(course)
    }
    console.log(selectedCourses,currentCard)
  return (
    <div className='flex w-full max-w-[1060px] gap-4 md:absolute -bottom-[23rem] p-[20px] z-10 md:flex-row flex-col   '>
    
           {
            selectedCourses.map((course,index)=>
            {
               return <div className={`h-[300px] w-full bg-green flex flex-col  justify-between gap-2 p-2 pt-4 ${currentCard===course?"bg-white text-richblack-900 shadow-bg":" border-2 border-richblack-200 shadow-md shadow-richblack-100 md:bg-richblack-800 text-white"}`} key={index} onClick={()=>chooseHandler(course)}>
                <div className='flex flex-col gap-2'>
                    <p className='text-[14px] sm:text-[17px] font-inter '>{course?.heading}</p>
                    <p className='text-[12px] sm:text-[14px] font-inter '>{course?.description}</p>
                    </div>
                    <div className='flex justify-between p-2 border-dashed border-t flex-col sm:flex-row '>
                        <div className='flex gap-1 items-center'>
                            <MdPeople className='text-blue-200'/>
                            <span className=' text-[12px] font-inter text-blue-200'>{course?.level}</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <FaNetworkWired className='text-blue-200'/>
                            <span className='text-[12px] font-inter text-blue-200' >{course?.lessonNumber}</span>
                        </div>
                    </div>
                </div>
            })
           }
       </div>
    
  )
}

export default ExploreCards