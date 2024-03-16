import React from 'react'
import { MdArrowLeft, MdRestore } from 'react-icons/md'
import OTPInput from 'react-otp-input'
import ButtonAuth from './ButtonAuth'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { sendOtp, signUp } from '../../../services/operations/authAPI'
import { setSignUpData } from '../../../store/Slices/authSlice'
import Countdown from 'react-countdown'


const VerifyEmail = () => {
    const [otp,setOtp]=useState('');
    const signUpData=useSelector((store)=>store.auth.signUpData);
    const[otptimer,setotptimer]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {email}=signUpData;
    const handleOnSubmit=(e)=>
    {
          e.preventDefault();
          dispatch(signUp(signUpData,otp,navigate));
          
          
    }
    const handleResendCode=()=>
    {
       if(!otptimer)
       {
         setotptimer(true)
        dispatch(sendOtp(email,navigate)) ;
        setTimeout(()=>
        {
         setotptimer(false)
         },60000
        )
       }
      
        
       
  
      

    }
  return (
    <div   className='min-h-screen w-full flex items-center justify-center   '>
        <form onSubmit={handleOnSubmit} className='w-[90%] max-w-[500px] h-fit p-[32px]  flex flex-col gap-[16px] shadow shadow-richblack-100 '>
        <h1 className='text-white font-inter font-semibold text-[24px]' >Verify Email</h1>
        <p className='text-white font-inter text-[14px]'>A verification code regarding login has been sent to you.Please enter the code below</p>
        <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        placeholder="------"
        renderSeparator={<span> 🔥 </span>}
        renderInput={(props) => <input {...props} style={{width:"40px", height:"40px", color:"black", textAlign:"center", borderRadius:"3px", fontWeight:"bold"}}/>}
        /> 
        
        <ButtonAuth title="Verify and Register"/>
        <div className='flex justify-between items-center'>
           <Link to="/login"> <div className='flex justify-between items-center text-[16px] text-white gap-1 cursor-pointer ' onClick={()=>dispatch(setSignUpData(null))}>
                <MdArrowLeft/>
                Back To Login
            </div></Link>
            <div className='flex justify-between items-center text-[16px] text-richblue-200 gap-1 cursor-pointer' onClick={handleResendCode}>
                <MdRestore/>
                {!otptimer?"Resend Code":<Countdown date={Date.now()+60000} renderer={({ minutes, seconds }) => (
            <span>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          )} />}
            </div>
        </div>

    </form>
    </div>
  )
}

export default VerifyEmail