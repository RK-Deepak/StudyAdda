import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';

import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import { login } from '../../../services/operations/authAPI';
import ButtonAuth from './ButtonAuth';
import { validateEmail ,validatePassword} from '../../../utils/Validation';


const LoginForm = () => {
 
    //after submiting we need to call login fn inside services
    //which call backend login api
    const dispatch=useDispatch();
    //when user corrrectly entr credentials or not for redirection
    const navigate=useNavigate();
    const [errorMessage,setError]=useState(null);
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })

    const {email,password}=formData;


    const handleOnSubmit=(e)=>
    {
        e.preventDefault();
        if(validateEmail(email) && validatePassword(password)){
          
            dispatch(login(email,password,navigate));
            
            setError(null);
          
        }
          else 
          {
            setError("Email or Password Validation Failed..");
          }

          setTimeout(() => {
            setError(null);
          }, 1000);
        

    }
    const handleOnChange=(e)=>{
          setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
          }
          ))
    }
  return (
    <>
  <form onSubmit={handleOnSubmit} className="mt-6 flex w-full flex-col gap-y-4">
 {/* //email */}
 <label className="w-full">
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
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 text-[14px] sm:placeholder:text-[16px]"
        />
      </label>

      {/* password */}
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 text-[14px] sm:placeholder:text-[16px]"
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
        <Link to="/forgot-password">
          <p className=" mt-4 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
     <ButtonAuth title="Login"/>
    
  </form>
   {errorMessage && <span className='text-red-500  font-inter my-2 text-xs flex justify-center'>Email or Password is Invaild</span>}
   </>
  )
}

export default LoginForm