import React from 'react'
import logoimage from "../../../assets/Logo/studyadda-high-resolution-logo-transparent.png"
import { FaFacebook, FaGoogle, FaXbox, FaYoutube } from 'react-icons/fa'
import {FooterLink2}  from "../../../data/footer-links.js"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='h-fit flex flex-col gap-4  bg-[#161D29] border-t border-[#424854] p-8 sm:pt-[52px] sm:pr-[120px] sm:pb-[52px] sm:pl-[120px] '>
        {/* top part */}
        <div className='flex flex-col lg:flex-row justify-evenly gap-4 '>
          {/* top left part */}
          <div className='flex flex-row gap-7 flex-wrap '>
          {/* section-1 */}
           <div className='flex flex-col gap-4 w-fit h-fit  '>
            <img src={logoimage} alt="logo/png" className='w-[100px]'/>
            <p className=' font-inter text-sm font-semibold text-[16px] text-richblack-200'>Company</p>
            <div className='flex flex-col gap-1'>
                <p className=' font-inter text-sm font-normal text-[14px] text-richblack-400'>About</p>
                <p className=' font-inter text-sm font-normal text-[14px] text-richblack-400'>Careers</p>
                <p className=' font-inter text-sm font-normal text-[14px] text-richblack-400'>Affiliated</p>
            </div>
            <div className='flex gap-1 '>
                <FaFacebook className='w-[24px] aspect-square text-richblack-300'/>
                <FaGoogle  className='w-[24px] aspect-square text-richblack-300 '/>
                <FaXbox  className='w-[24px] aspect-square text-richblack-300'/>
                <FaYoutube  className='w-[24px] aspect-square text-richblack-300'/>
            </div>
           </div>
          {/* section-2 */}
          <div className='flex flex-col gap-2  '>
          {/* section-2 top */}
          <div className='flex gap-2 flex-col '>
          <p className=' font-inter text-sm font-semibold text-[16px] text-richblack-200'>Resources</p>
          <div className='flex flex-col gap-1 '>
          <p className='font-inter text-sm font-normal text-[14px] text-richblack-400'>Articles</p>
          <p className='font-inter text-sm font-normal text-[14px] text-richblack-400'>Blog</p>
          <p className='font-inter text-sm font-normal text-[14px] text-richblack-400'>Cheat Sheet</p>
          <p className='font-inter text-sm font-normal text-[14px] text-richblack-400'>Code Challenges</p>
          <p className='font-inter text-sm font-normal text-[14px] text-richblack-400'>Docs</p>
          <p className='font-inter text-sm font-normal text-[14px] text-richblack-400'>Projects</p>
          <p className='font-inter text-sm font-normal text-[14px] text-richblack-400'>Videos</p>

          </div>
          </div>
          {/* section-2 bottom */}
          <div className='flex flex-col gap-2'>
          <p className=' font-inter text-sm font-semibold text-[16px] text-richblack-200'>Support</p>
          <div>
          <p className='font-inter text-sm font-normal text-[14px] text-richblack-400'>Help</p>
          </div>
          </div>
          </div>
          {/* section-3 */}
          <div className='flex flex-col gap-2 '>
          {/* section-3 top */}
          <div className='flex gap-2 flex-col '>
          <p className=' font-inter text-sm font-semibold text-[16px] text-richblack-200'>Plans</p>
          <div className='flex flex-col gap-1 '>
          <p className='font-inter text-sm font-normal text-[14px] text-richblack-400'>Paid memberships</p>
          <p className='font-inter text-sm font-normal text-[14px] text-richblack-400'>For Students</p>
          <p className='font-inter text-sm font-normal text-[14px] text-richblack-400'>Business solutions</p>


          </div>
          </div>
          {/* section-3 bottom */}
          <div className='flex flex-col gap-2'>
          <p className=' font-inter text-sm font-semibold text-[16px] text-richblack-200'>Community</p>
          <div className='flex flex-col gap-1 '>
          <p className='font-inter text-sm font-normal text-[14px] text-richblack-400'>Forums</p>
          <p className='font-inter text-sm font-normal text-[14px] text-richblack-400'>Events</p>
          </div>
          </div>
          </div>
          </div>
          {/* top right part */}
          <div className=' border border-richblack-200 lg:w-[1px] w-full'></div>
          <div className=''>
          
          <div className='flex flex-row gap-7 items-baseline justify-between flex-wrap '>
            {
                FooterLink2.map((eachSection,index)=>
                {
                   return (
                    <div className='flex gap-2 justify-evenly flex-col ' key={index}>
                   <p className=' font-inter text-sm font-semibold text-[16px] text-richblack-200' >{eachSection.title}</p>
                   {eachSection.links.map((item,index)=>
                   {
                    return <Link to={item.link} key={index}>
                    <p className='font-inter text-sm font-normal text-[14px] text-richblack-400 hover:text-green-600'>{item.title}
                        </p>
                        </Link>
                   })}
                   <div>
                    
                   </div>
                   </div>
                   )
                })
            }
          </div>
          </div>
        </div>

        <div className='border w-full border-[#424854] '></div>
        {/* bottom part */}
        <div className='flex justify-between w-full flex-col items-center gap-2 md:gap-0 md:flex-row'>
           {/* //bottom left part */}
           <div className='flex gap-2 '>
            <p className=' border-r pr-2 font-inter text-xs sm:text-sm  text-richblack-400'>Privacy Policy</p>
            <p className=' border-r pr-2 font-inter text-xs sm:text-sm  text-richblack-400 '>Cookie Policy</p>
            <p className=' font-inter text-sm  text-richblack-400  '>Terms</p>
           </div>
           {/* //bottom right part */}
         <div>
            <p className=' font-inter text-xs sm:text-sm  text-richblack-400 text-center '>Made By RK_Deepak Verma © 2024 StudyAdda</p>
         </div>
        </div>
        
    </div>
  )
}

export default Footer