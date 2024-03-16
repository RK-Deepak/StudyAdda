import React from 'react'
import { MdArrowLeft, } from 'react-icons/md'

import ButtonAuth from './ButtonAuth'
import { useState } from 'react'

import { setSignUpData } from '../../../store/Slices/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { resetpassowrdtoken } from '../../../services/operations/authAPI'
const ForgetPass = () => {
const [resetTokenSend,setresetTokenSend]=useState(false);
const dispatch=useDispatch();
const navigate=useNavigate();
const [email,setemail]=useState("")
const [userExisted,setuserExisted]=useState(true)


const handleOnSubmit=(e)=>
{
  e.preventDefault();
    setresetTokenSend(true);
    dispatch(resetpassowrdtoken(email,navigate,setuserExisted))
}
const handleOnChange=(e)=>
{
   setemail(e.target.value)
}


  return (
    <div   className='min-h-screen w-full flex items-center justify-center   '>
        <form onSubmit={handleOnSubmit} className='w-[90%] max-w-[500px] h-fit p-[32px]  flex flex-col gap-[16px] shadow shadow-richblack-100 '>
        <h1 className='text-white font-inter font-semibold text-[24px]' >{!resetTokenSend?"Reset your password":userExisted?"Check email":"User Is Not Registered Yet..."} </h1>
        <p className='text-white font-inter text-[14px]'>{!resetTokenSend?`Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery`:
        userExisted?`We have sent the reset email to ${email}`:"Please go back and join our journey where we will rock..."}</p>

{!resetTokenSend && <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>}
     
        
        <ButtonAuth title={!resetTokenSend?"Reset Password":userExisted && "Resend email"} userExisted={userExisted}/>
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




export default ForgetPass