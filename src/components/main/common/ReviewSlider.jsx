import React from 'react'
import { useEffect,useState } from 'react'
import {apiConnector} from "../../../services/apiConnector.js"
import ReactStars from 'react-stars'
import {Swiper,SwiperSlide} from "swiper/react"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import { FaStar } from "react-icons/fa"
import { courseEndPoints } from '../../../services/apis.js'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../../App.css"


const ReviewSlider = () => {

    const{GET_ALL_RATINGS_API}=courseEndPoints;
    const [reviews,setReviews]=useState([]);
    const truncateLength=15
    useEffect(()=>
{

    const fetchAllRatings = async () => {
        const response=await apiConnector("GET",GET_ALL_RATINGS_API);
        console.log(response);
        if(response?.data?.success)
        {
            setReviews(response?.data?.data)
        }
    }
      fetchAllRatings();
},[])
  return (
    <div className="text-white my-3">
      <p className='text-center text-white text-xl underline font-inter'>Reviews</p>  
       <div className="my-[50px] h-[190px]">
        <Swiper
        slidesPerView={1} 
        spaceBetween={20}
        loop={true}
        freeMode={true}
        autoplay={{
            delay: 2000,
            disableOnInteraction: false,

        }}
        breakpoints={{
          320: {
              slidesPerView: 1,
              spaceBetween: 60
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 60
            },
            // when window width is >= 640px
            1080: {
              slidesPerView: 3,
              spaceBetween: 40
            }
      }}
        modules={[FreeMode,Pagination,Autoplay]}
        className='w-full'

        >
             {reviews?.map((review,i)=>
            {
                return (
                    <SwiperSlide key={i}>
                    <div className="flex flex-col gap-3 rounded-md bg-richblack-600 p-3 text-[14px] text-richblack-25 w-[300px] min-h-[180px] ">

                      <div className="flex items-center gap-4">
                        <img
                          src={
                            review?.user?.image
                              ? review?.user?.image
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?review?.user?.firstName:"Deleted"} ${review?.user?review?.user?.lastName:"User"}`
                          }
                          alt=""
                          className="h-9 w-9 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <h1 className="font-semibold text-richblack-5">{review?.user?review?.user?.firstName:"Deleted"} {review?.user?review?.user?.lastName:"User"}</h1>
                          <h2 className="text-[12px] font-medium text-richblack-900">
                            {review?.course?.courseName}
                          </h2>
                        </div>
                      </div>
                      <p className="font-medium text-richblack-25">
                        {review?.review.split(" ").length > truncateLength
                          ? `${review?.review
                              .split(" ")
                              .slice(0, truncateLength)
                              .join(" ")} ...`
                          : `${review?.review}`}
                      </p>
                      <div className="flex items-center gap-2 ">
                        <h3 className="font-semibold text-yellow-100">
                          {review.rating.toFixed(1)}
                        </h3>
                        <ReactStars
                          count={5}
                          value={review.rating}
                          size={20}
                          edit={false}
                          activeColor="#ffd700"
                          emptyIcon={<FaStar />}
                          fullIcon={<FaStar />}
                        />
                      </div>
                    </div>
                  </SwiperSlide>

                )
            })}
          

        </Swiper>
        </div> 
    </div>
  )
}

export default ReviewSlider