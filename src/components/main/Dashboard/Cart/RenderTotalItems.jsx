import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from '../../../../store/Slices/cartSlice'
import ReactStars from "react-rating-stars-component"
import GetAvgRating from '../../../../utils/avgRating'

const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // const tags=JSON.parse(cart?.tag);
   


  return (
    <div className="flex  w-[80%] lg:w-[70%] flex-col border border-richblack-300 rounded-md p-3 ">
    {cart.map((course, index) => (
      <div
        key={course._id}
        className={`flex flex-col md:flex-row flex-wrap items-center md:items-start justify-evenly md:justify-between gap-6 ${
          index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
        } ${index !== 0 && "mt-6"} `}
      >
        <div className="flex items-center  flex-col gap-4 xl:flex-row md:text-start text-center ">
          <img
            src={course?.thumbnail}
            alt={course?.courseName}
            className="h-[148px] w-[220px] rounded-lg object-cover"
          />
          <div className="flex flex-col space-y-1">
            <p className="text-lg font-medium text-richblack-5">
              {course?.courseName}
            </p>
            <p className="text-sm text-richblack-300">
              {course?.category?.name}
            </p>
            <div className="flex  flex-col sm:flex-row items-center gap-2">
              <div className='flex items-center gap-2'>
              <span className="text-yellow-5">{GetAvgRating(course?.ratingAndReviews)}</span>
              <ReactStars
                count={5}
                value={course?.ratingAndReviews?.length}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<GiNinjaStar/>}
                fullIcon={<GiNinjaStar/>}
              />
              </div>
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <div>
     

            </div>
          </div>
        </div>
        <div className="flex flex-col md:items-end space-y-2 items-center  ">
          <button
            onClick={() => dispatch(removeFromCart(course._id))}
            className="flex items-center flex-row-reverse gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
          >
            <RiDeleteBin6Line />
            <span>Remove </span>
          </button>
          <p className="mb-6 text-2xl font-bold text-green-900">
            ₹ {course?.price}
          </p>
        </div>
      </div>
    ))}
  </div>
  )
}

export default RenderCartCourses
