import React from 'react'
import { MdArrowLeft} from 'react-icons/md'
import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai'

import ButtonAuth from './ButtonAuth'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate,Link, useLocation } from 'react-router-dom'

import { setSignUpData } from '../../../store/Slices/authSlice'
import { resetpassword } from '../../../services/operations/authAPI'


const UpdatePassword = () => {
  
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const location=useLocation();

  const [showPassword,setShowPassword]=useState("false");
  const [showConfirmPassword,setShowConfirmPassword]=useState("false")

  const [formData,setFormData]=useState({
    password:"",
    confirmPassword:""
  })

  const resettoken=location.pathname.split("/").slice(-1);
  console.log(resettoken[0])

  const {password,confirmPassword}=formData;

  const handleOnSubmit=(e)=>
  {
       e.preventDefault();
       dispatch(resetpassword(password,confirmPassword,resettoken,navigate));

  }

  const handleOnChange=(e)=>
  {
        setFormData((prev)=>(
            {
                ...prev,
                [e.target.name]:e.target.value
            }
        ))
  }

  
  
  return (
     <div   className='min-h-screen w-full flex items-center justify-center   '>
        <form onSubmit={handleOnSubmit} className='w-[90%] max-w-[500px] h-fit p-[32px]  flex flex-col gap-[16px] shadow shadow-richblack-100 '>
        <h1 className='text-white font-inter font-semibold text-[24px]' >Choose new password</h1>
        <p className='text-white font-inter text-[14px]'>Almost done. Enter your new password and youre all set.</p>
        <div className="flex gap-y-4 flex-col">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter New Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm New Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        
        <ButtonAuth title="Reset Password"/>
        <div className='flex justify-between items-center'>
           <Link to="/login"> <div className='flex justify-between items-center text-[16px] text-white gap-1 cursor-pointer ' onClick={()=>dispatch(setSignUpData(null))}>
                <MdArrowLeft/>
                Back To Login
            </div></Link>
            
        </div>

    </form>
    </div>
  )
}

export default UpdatePassword