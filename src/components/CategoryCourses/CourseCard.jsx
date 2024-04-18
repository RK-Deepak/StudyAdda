import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import GetAvgRating from '../../utils/avgRating';
import RatingStars from '../main/common/RatingsStarCalc';
const CourseCard = ({course,show}) => {

    const [avgRating,setavgRating]=useState(0);
    
    useEffect(()=>
    {
       const countStars=GetAvgRating(course?.ratingAndReviews);
       console.log("counting starrs",countStars)
       setavgRating(countStars);

    },[course?.ratingAndReviews])
  return (
    <div className=' cursor-pointer'>
        <Link to={`/courses/${course._id}`}>
            <div >
                <img src={course?.thumbnail}
                alt='course thumbnail'
                className='h-[250px] max-w-[400px] w-full rounded-lg object-cover'/>
            </div>
            <div className="flex flex-col gap-2 px-1 py-3">
                <p className="text-xl text-richblack-5">{course?.courseName}</p>
                <p className="text-sm text-richblack-50">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                <div className="flex items-center gap-2">
                <span className="text-yellow-5">{avgRating || 0}</span>
                    <RatingStars AVG_REVIEW_COUNT={avgRating} STAR_SIZe={30}/>
                   
                    <span className="text-richblack-400">{course.ratingAndReviews.length} Ratings</span>
                </div>
                <div>
                    <span className="text-xl text-richblack-5">Rs{" "}{course?.price}</span>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default CourseCard