import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighlightText from './HighlightText'
import ExploreCards from './ExploreCards'

const ExploreMore = () => {
    const tabs=[
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths"
    ]

    const [currentTab,setCurrentTab]=useState(tabs[0]);
    const [selectedCourses,setSelectedCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setcurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCards=(element)=>
    {
          setCurrentTab(element);
         
          const result=HomePageExplore.filter((course)=>course.tag===element);
          console.log(result)
          setSelectedCourses(result[0].courses);
          setcurrentCard(result[0].courses[0].heading)
    }
   



  return (
    <div className='relative w-[90%]'>
        <div className='text-2xl sm:text-4xl font-semibold text-center '>
            {`Unlock the\n`}
            <HighlightText text={` Power of Code`} textanimationshow={false}/>
        </div>
        <p className='text-center text-richblack-300 text-sm text-[16px] mt-3'>
        Learn to build anything you can imagine
        </p>
        <div className='mt-5 -mb-[3.5rem] sm:my-5 flex sm:flex-row rounded-full bg-richblack-800  border-richblack-100
      sm:px-1 sm:py-1 flex-wrap flex-col p-[23px] sm:p-[40px] w-full justify-between relative underline md:no-underline items-center sm:items-stretch '>
        {
          tabs.map((element,index)=>
          {
            return <div key={index}  className={`text-[16px] flex flex-row items-center gap-2 
            ${currentTab === element 
            ? "bg-richblack-900 text-richblack-5 font-medium"
            : "text-richblack-200" } rounded-full transition-all duration-200 cursor-pointer
            hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} 
            onClick={()=>setMyCards(element)}>
              {element}
          
            </div>
          })
        }
         <ExploreCards selectedCourses={selectedCourses} currentCard={currentCard} setcurrentCard={setcurrentCard}/>

        </div>
        <div className='h-[250px]'/>
       
         
    </div>
  )
}

export default ExploreMore