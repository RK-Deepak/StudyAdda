import React from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"


import {Autoplay,Navigation,Pagination,Scrollbar,FreeMode} from "swiper/modules"
import CourseCard from './CourseCard'

const CourseSlider = ({courses}) => {
  return (
    <>
    {
        courses && courses?.length?(
            <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={25}
            pagination={true}
            scrollbar={true}
            modules={[Pagination,FreeMode]}
            className='max-h-[30rem]'
         
            navigation={true}
            breakpoints={{
                1024:
                {slidesPerView:3}
            }}
            

            >
                {
                    courses?.map((course,index)=>
                    {
                       return  <SwiperSlide key={index}>
                            <CourseCard course={course}/>
                        </SwiperSlide>
                    })
                }

            </Swiper>
        ):(<span className="text-xl text-richblack-5">No Such Courses</span>)
    }
    </>
  )
}

export default CourseSlider