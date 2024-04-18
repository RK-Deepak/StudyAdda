import React from 'react'
import HighlightText from "../components/main/HomePage/HighlightText"
import img1 from "../assets/Images/aboutus1.webp"
import img2 from "../assets/Images/aboutus2.webp"
import img3 from "../assets/Images/aboutus3.webp"
import boxoffice from "../assets/Images/boxoffice.png"
import Quote from '../components/main/About/Quote'
import { website_Info } from '../utils/contants'
import AboutLearningGrid from '../components/main/About/AboutLearningGrid'
import ContactForm from '../components/main/common/ContactForm'
import ReviewSlider from '../components/main/common/ReviewSlider'
const About = () => {
  return (
    <>
    <div className=' bg-richblack-600 min-h-[550px] '>
         {/* Section-1 */}
         <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent
        items-center text-white justify-between'>
            
           
         <div className='text-center text-2xl  md:text-4xl font-semibold mt-7 flex flex-col items-center gap-2'>
         <p className=' text-richblack-100 text-xs'>About Us</p>
            <span>Let's Grind and Hustle Till You</span>
            <HighlightText text={" Become A Undefeated Programmer..."} textanimationshow={false} />
         </div>
         <div className='mt-4 w-full md:w-[70%] text-start md:text-center text-md md:text-lg font-bold text-richblack-300 '>
         StudyAdda is one of the beset platform for online education. We're passionate about creating a fabulous future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
         </div>
         <div className='flex flex-col md:flex-row gap-7 mt-8 '>
         
         </div>
         <div className=' p-5 min-h-[150px] w-full z-10 '>
         <div className='flex flex-row  gap-3 relative bottom-0   xl:absolute xl:-bottom-[14rem] left-0 justify-evenly flex-wrap '>
            <img src={img2} className=' rounded-sm'/>
            <img src={img1} className=' rounded-sm'/>
            <img src={img3} className=' rounded-sm'/>
         </div>
         </div> 
          

        
        
           
    </div>
    </div>
    {/* section-2 */}
    <div className='min-h-[350px] 
    relative mx-auto flex 
    items-center text-white justify-between  z-0  w-11/12  '>
        <div >
      <Quote/>
      </div>
    </div>
    {/* section-3 */}
    
    <div className='relative    border-t border-richblack-25 p-6'>
      {/* //holding two div    */}
    <div className='w-11/12 mx-auto p-2 flex    flex-col gap-6'>
       {/* //top div */}
       <div className='flex w-full justify-between items-center flex-wrap gap-6  xl:flex-row '>
         <div className='flex flex-col gap-3 w-full lg:max-w-[500px]'>
            <h3 className=' font-inter font-semibold text-red-400 text-xl  '>Our Founding Story </h3>
            <div className='flex flex-col gap-2 text-richblack-25  font-inter font-semibold text-sm'>
            <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
            <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
            </div>

         </div>
         <div className=' w-full lg:max-w-[500px] '>
            <img src={boxoffice} alt='boxoffice'/>
         </div>
       </div>
       //bottom div
    
    <div className='flex w-full justify-between items-center my-4 flex-wrap gap-4 '>
         <div className='flex flex-col gap-3 w-full xl:max-w-[400px]'>
            <h3 className=' font-inter font-semibold text-blue-400 text-xl  '>Our Dream</h3>
           
            <p className=' text-richblack-25 font-inter font-semibold text-sm '>With this dream in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>   


         
<div className='flex flex-col gap-3 w-full xl:max-w-[400px]'>
            <h3 className=' font-inter font-semibold text-green-400 text-xl  '>Our Mission</h3>
           
            <p className=' text-richblack-25  font-inter font-semibold text-sm'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
           
</div>
</div>

       </div>
    </div>
    {/* section-4 */}
    <div className=' bg-richblack-600 min-h-[200px] w-full flex items-center'>
        <div className='w-11/12 mx-auto flex justify-evenly gap-2 h-full flex-wrap'>
            {
                website_Info.map((element)=>
                {
                    return <div key={element.id} className='flex flex-col gap-1 max-w-[150px] w-full p-2 aspect-square  justify-center items-center'>
                        <p className=' text-white font-inter font-bold text-4xl'>{element.info}</p>
                        <p className=' text-richblack-200 font-inter text-xs font-semibold'>{element.relatedTo}</p>
                    </div>
                })
            }
        </div>
    </div>
   {/* section-5 */}
   <AboutLearningGrid/>
   {/* section-6 */}
   <ContactForm/>
   <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent '
          >
         <ReviewSlider/>
         </div>
   
    </>
   
  )
}

export default About