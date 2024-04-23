import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../../utils/contants';
import toast from 'react-hot-toast';
import { setSignUpData } from '../../../store/Slices/authSlice';
import Tab from '../common/Tab';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import { sendOtp } from '../../../services/operations/authAPI';
import ButtonAuth from './ButtonAuth';
import PasswordChecklist from "react-password-checklist"




const SignupForm = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    //account type
    const [accountType,setAccountType]=useState(ACCOUNT_TYPE.STUDENT);

    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { firstName, lastName, email, password, confirmPassword } = formData

    //handle infput field
    const handleOnChange=(e)=>
    {
         setFormData((prev)=>
         ({
            ...prev,
            [e.target.name]:e.target.value

         }

         ))
    }
    //handle submit
  const handleOnSubmit=(e)=>
  {
    e.preventDefault();
    if(password!==confirmPassword)
    {
        toast.error("Password Do Not Match");
        return;
    }

    const signUpData={
        ...formData,
        accountType
    }

    //setting signupdata in store
    //this is used when otp is verified
    dispatch(setSignUpData(signUpData))
    //send otp for verification
    dispatch(sendOtp(email,navigate))


    //reset form 
    setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)

  }
  //data to pass to tab component
  const tabData=[
    {
        id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,

    },
    {
        id: 2,
        tabName: "Instructor",
        type: ACCOUNT_TYPE.INSTRUCTOR,
    }
  ]

  

  return (
    <div>
    {/* TAB */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
    {/* FORM */}
     {/* Form */}
     <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 text-[14px] sm:placeholder:text-[16px]"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 text-[14px] sm:placeholder:text-[16px] "
            />
          </label>
        </div>
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
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
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
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 text-[14px] sm:placeholder:text-[16px]"
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
            <p className="mb-1  leading-[1.375rem] text-richblack-5 text-[14px] sm:placeholder:text-[16px]">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 text-[14px] sm:placeholder:text-[16px]"
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
      <ButtonAuth title="Sign Up"/>
      </form>
      <PasswordChecklist
				rules={["minLength","specialChar","number","match","notEmpty"]}
				minLength={6}
				value={password}
				valueAgain={confirmPassword}
				onChange={(isValid) => {}}
        iconSize={10}
       

        style={{color: "white",margin:"15px 0px " ,display:"flex",alignItems: "start",flexDirection:"column", }}
			/>
     
      </div>
    
    
  )
}

export default SignupForm