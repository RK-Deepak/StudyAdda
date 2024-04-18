import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate,useParams } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentPoints'
import { getCourseDetails } from '../services/operations/courseAPI'
import RatingStars from '../components/main/common/RatingsStarCalc'
import GetAvgRating from '../utils/avgRating'
import { FiClock, FiGlobe, FiMousePointer, FiShare, FiShare2, FiTv } from 'react-icons/fi'
import { FaCertificate } from "react-icons/fa";
import { formatDate } from '../utils/dateFormatter'
import CourseAccordium from '../components/CourseAccordium.jsx/CourseAccordium'
import ConfirmationModal from '../components/main/common/ConfirmationModal2'
import toast from 'react-hot-toast'
import { addToCart } from '../store/Slices/cartSlice'
import copy from 'copy-to-clipboard'


const CourseDetails = () => {
  const {user}=useSelector((store)=>store.profile)
  const {token}=useSelector((store)=>store.auth);
  const {loading} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {courseId}=useParams();
  const {course}=useSelector((store)=>store.course)

  const [courseDetails,setcourseDetails]=useState(null);
  const [confirmationModal,setconfirmationModal]=useState(null)
   const [avgRating,setavgRating]=useState(0);

const handleAddToCart=()=>
{
    if(user && user.accountType==="Instructor")
    {
      toast.error("You are an Instructor, you cant buy a course");
      return;
    }
    if(token)
    {
      console.log("Dispatching add to cart");
      dispatch(addToCart(courseDetails?.courseDetails));
      return;
    }
    setconfirmationModal({
      text1:"you are not logged in",
            text2:"Please login to add to cart",
            btn1text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler: ()=> setconfirmationModal(null),
    })
}
  const handleBuyCourse=()=>
  {
    if(token && !user.courses.includes(courseId))
    {
      buyCourse(token,[courseId],user,navigate,dispatch);
       
      return;
    }
    if(!token)
    {
      setconfirmationModal({
        text1:"You are not logged in",
        text2:"Please login to purchase the course",
        btn1Text:"Login",
        btn2Text:"Cancel",
        btn1Handler:()=>navigate("/login"),
        btn2Handler:()=>setconfirmationModal(null)
      })
    }
    if(token && user.courses.includes(courseId) )
    {
      navigate("/dashboard/enrolled-courses");
      return;
    }
    

  }

  const handleShare=()=>
  {
    copy(window.location.href);
    toast.success("Link Copied to clipboard")
  }


  useEffect(()=>
  {

    const fetchCourseDetails=async()=>
    {
      const response=await getCourseDetails({courseId},token);
      setcourseDetails(response);
      console.log(response);

      const avg_rating_value=GetAvgRating(response?.courseDetails?.ratingAndReviews);
         setavgRating(avg_rating_value)
    }
      fetchCourseDetails();
  },[courseId])


  if(loading || !courseDetails)
  {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className='flex  text-white flex-col  gap-6 mx-auto w-[90%]'>
 
      {/* section-1 */}
 
      <div className=' gap-4  bg-richblack-700 w-full pt-[32px] pr-[120px] pb-[32px] pl-[10px] md:pl-[120px] flex flex-col lg:flex-row  justify-between' >
        <div className="flex flex-col gap-6   ">
        <p className='font-inter text-sm text-richblack-400'>Home / Learning /
          <span className='text-[#FFD60A]'>{" "}{courseDetails?.courseDetails?.category?.name}</span>
        </p>

        <div> 
        <p className='font-inter text-[32px] text-richblack-5 font-semibold'>{courseDetails?.courseDetails?.courseName}</p>
        <p className=' font-inter font-normal text-richblack-400 text-sm'>{courseDetails?.courseDetails?.courseDescription}</p>
        </div>

        <div className='flex flex-col md:flex-row gap-2 items-baseline  '>
          <div className='flex items-center gap-2'>
        <span className='font-inter text-yellow-50 font-semibold text-[16px] '>{avgRating || 0}</span>
        <RatingStars AVG_REVIEW_COUNT={avgRating} STAR_SIZE={25}/>
        </div>
        <div className='flex gap-2'>
        <span className='font-inter font-normal text-[16px] text-richblack-300'>({courseDetails?.courseDetails?.ratingAndReviews?.length}{" "}Ratings)</span>
        <span className='font-inter font-normal text-[16px] text-richblack-300'>{courseDetails?.courseDetails?.studentEnrolled?.length}{" "} Students</span>
        </div>
        </div>

        <div className='flex flex-col gap-2 justify-center text-richblack-50'>
         <p className='font-inter font-normal text-[18px]'>Created by {courseDetails?.courseDetails?.instructor?.firstName} {courseDetails?.courseDetails?.instructor?.lastName}</p> 
         <div className='flex flex-col md:flex-row gap-2 items-baseline '>
         <p className='flex gap-2 items-center text-[16px]'><FiClock className='text-[18px]'/> Published at {formatDate(courseDetails?.courseDetails?.createdAt)}</p>
         <p className='flex gap-2 items-center text-[16px] capitalize'><FiGlobe className='text-[18px]'/>{courseDetails?.courseDetails?.language}</p>
         </div>

        </div>
        </div>
        <div className='flex flex-col lg:flex-row items-center border border-richblack-500 rounded-md p-4 gap-4 bg-richblack-500 '>
          <div className='flex flex-col gap-2'>
          <img src={courseDetails?.courseDetails?.thumbnail} alt='course thubmial' className='w-full max-w-[250px] rounded-md h-[210px]'/>
          <div className='flex flex-wrap items-center gap-2 justify-between px-7'>
          <p className="font-inter text-[20px] text-richblack-50 font-bold">Rs. {courseDetails?.courseDetails?.price}</p>
          <div className='flex gap-2 items-center font-inter text-[20px] text-yellow-50 font-bold  ' onClick={handleShare}>
          <FiShare2/><span>Share</span>
          </div>
        </div>
          </div>
          <div className='flex flex-col-reverse gap-2'>
           
            <div className='flex flex-col md:flex-row -my-[10px] gap-0 md:gap-2 text-richblack-800 font-inter font-semibold text-sm'>
             
      <button className={`bg-yellow-50 px-6 py-2 mt-10 rounded-md ${user && user.accountType==="Instructor"?"hidden":"block"}` } 
      onClick={handleBuyCourse}>
         {user && user?.courses.includes(courseId)?"Go To Courses":"Buy Now"} 
      </button>
      <button className={`bg-richblack-50 px-6 py-2 mt-10 rounded-md ${user && user.accountType==="Instructor"?"hidden":"block"}`}
    onClick={handleAddToCart} >
        {user && user?.courses.includes(courseId)?"Already Bought":"Add To Cart"}
      </button>
            
            </div>
           
            <div className='flex gap-2 flex-col'>
              <p className='font-inter text-[21px] text-richblack-800 font-bold'>The Course Inclues:</p>
              <div className='flex flex-col gap-1 font-inter text-green-900 text-sm font-semibold'>
                <div className='flex items-center gap-2 '>
                  <FiClock/><span>Zero to Hero Training</span>
                  </div>
                  <div className='flex items-center gap-2'>
                  <FiMousePointer/><span>2 Years Access</span>
                  </div>
                  <div className='flex items-center gap-2'>
                  <FiTv/><span>Access on Mobile and TV</span>
                  </div>
                  <div className='flex items-center gap-2'>
                  <FaCertificate/><span>Certificate After Completion</span>
                  </div>
               
                
              </div>
                 <div className=' text-start'>
              <p className=' text-richblack-5 text-xs font-semibold'>30 Days Money Back Guarantee</p>
            </div>
            </div>
          </div>
        </div>
        
       
        </div>
       
{/* Section-2 */}
      
      <div className='relative h-[200px] w-[90%] md:w-[100%] mx-auto  max-w-[900px] border border-richblack-500 rounded-sm  p-[32px] text-white flex flex-col gap-2'>
          
          <p className=' text-lg font-inter font-semibold text-[30px] text-richblack-5'>What you'll learn</p>
         <p className="text-[14px] text-sm font-inter font-normal text-richblack-100">{courseDetails?.courseDetails?.whatYouwillLearn}</p>
        </div>
        {/* Section-3 */}
        <div className='flex gap-2 flex-col items-start relative mx-auto  w-[90%] md:w-[100%]  max-w-[900px] border border-richblack-500 rounded-sm  p-[32px]'>
          <p className='font-bold text-2xl font-inter'>Course Content</p>
          
          <CourseAccordium courseDetails={courseDetails?.courseDetails}/>
        </div>
        {/* Section-4 */}
        <div className='flex gap-3 border border-richblack-500 rounded-sm flex-col items-start relative    mx-auto  w-[90%] md:w-[100%] max-w-[900px] p-[32px] mb-4'>
          <p className='font-bold text-2xl font-inter'>Author</p>
          <div className='flex gap-2'>

            <img src={courseDetails?.courseDetails?.thumbnail} alt='thumbnail' className='w-[50px] aspect-square rounded-full '/>
            <p className='flex gap-2 items-center font-inter font-semibold text-[16px]'>{courseDetails?.courseDetails?.instructor.firstName} {courseDetails?.courseDetails?.instructor.lastName}</p>
            </div>
            <p className='font-inter text-sm text-richblack-500 '>I will be your lead trainer in this course. Within no time, I will help you to understand the subject in an easy manner. I have a huge experience in online training and recording videos. Let's get started!</p>
          
        </div>

                {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}

    </div>
  )
}

export default CourseDetails