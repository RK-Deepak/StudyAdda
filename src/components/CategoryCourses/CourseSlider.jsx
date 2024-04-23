import React from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/autoplay"


import {Autoplay,Pagination,FreeMode} from "swiper/modules"
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
            autoplay={
                {
                    delay: 2000,
                    disableOnInteraction: false,
                }
            }
            modules={[Pagination,FreeMode,Autoplay
            ]}
            className='max-h-[30rem] '
         
            navigation={true}
            breakpoints={{
                480: {
                    slidesPerView: 2,
                    spaceBetween: 20
                  },
                  // when window width is >= 480px
                
                  // when window width is >= 640px
                  1080: {
                    slidesPerView: 3,
                    spaceBetween: 40
                  }
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