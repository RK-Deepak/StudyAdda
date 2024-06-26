import React from 'react'
import frameImg from "../../../assets/Images/final.jpg"
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { useSelector } from 'react-redux'


const Tempelate = ({ title,description1,description2,image,formType}) => {

  const loading=useSelector((store)=>store.auth.loading)
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {
      loading ? (<div className='loader'></div>) : 
      (<div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-evenly gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
      <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
          {title}
        </h1>
        <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
          <span className="text-richblack-100">{description1}</span>{" "}
          <span className="font-edu-sa font-bold italic text-blue-100">
            {description2}
          </span>
        </p>
        {formType === "signup" ? <SignupForm /> : <LoginForm />}
      </div>
      <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
        <img
          src={frameImg}
          alt="Pattern"
          width={558}
         className='h-full'
          loading="lazy"
        />
        <img
          src={image}
          alt="Students"
          width={558}
         
          loading="lazy"
          className="absolute top-[1rem] right-0 md:-top-4 md:right-4 z-10 h-full"
        />
      </div>
    </div>)
      }
    </div>
  )
}

export default Tempelate