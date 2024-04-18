import React from 'react'
import CatCourse from '../components/CategoryCourses/CatCourse'
import ReviewSlider from '../components/main/common/ReviewSlider'
const Catlog = () => {
  return (
    <>
    <div>
        <CatCourse/>
    </div>
    <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent '
          >
         <ReviewSlider/>
         </div>
    </>
  )
}

export default Catlog