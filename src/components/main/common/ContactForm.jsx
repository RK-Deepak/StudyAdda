
import React, { useEffect,useState } from 'react'
import { useForm } from 'react-hook-form';
import ButtonAuth from '../Auth/ButtonAuth';
import countrycode from "../../../data/countrycode.json"
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { contactSubmission } from '../../../services/operations/contactAPI';

//point here what ever u write in register that got store as name in sending data
//means if we write firstName than it is send as firstName NO RELATION WOITH NAME in input
const ContactForm = () => {
    const [loading ,setloading]=useState(false);
    const dispatch=useDispatch();
    const {register,reset,formState:{errors,isSubmitSuccessful},handleSubmit}=useForm();

    const handleFormSubmit=(data)=>
    {
        console.log(data)
     
       
       dispatch(contactSubmission(data));

          

    }
    useEffect(()=>
    {
          if(isSubmitSuccessful)   
          {
            reset({
                firstName:"",
                lastName:"",
                email:"",
                phonenumber:"",
                message:"",
                countryCode:"+91"
                


            })
          }
    },[reset,isSubmitSuccessful])
  return (
    <div className='w-11/12 flex items-center flex-col my-20 gap-10 mx-auto' >
        <div className='flex flex-col items-center gap-2'>
        <h1 className='text-white font-bold text-[28px] font-inter'>Get In Touch</h1>
        <p className=' text-richblack-400 text-[12px] font-semibold font-inter'>We’d love to here for you, Please fill out this form.</p>
        </div>
        
    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col  items-center gap-6 w-fit'>
         <div className="flex flex-col gap-4 sm:flex-row w-full ">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstname"
              

              
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 text-[14px] sm:placeholder:text-[16px]"
              {...register("firstName",{required:true})}
              
            />
            {
                errors.firstName &&  (<span>"Please Enter First Name"</span>)
            }
          </label>
          <label>
            <p className="mb-1  leading-[1.375rem] text-richblack-5 text-[14px] sm:placeholder:text-[16px]">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
            
            
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 text-[14px] sm:placeholder:text-[16px]"
              {...register("lastName",{required:true})}
            />
            {
                errors.lastName && <span>Please Enter Last Name</span>
            }
          </label>

         
        </div>
         <label className='w-full'>
            <p className="mb-1 leading-[1.375rem] text-richblack-5 text-[14px] sm:placeholder:text-[16px]">
              Email<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              

              
              placeholder="Enter your email"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 text-[14px] sm:placeholder:text-[16px]"
              {...register("email",{required:true})}
              
            />
            {
                errors.email &&  (<span>"Please Enter Your Email"</span>)
            }
          </label>
            <label className='w-full' >
            <p className="mb-1  leading-[1.375rem] text-richblack-5 text-[14px] sm:placeholder:text-[16px]">
              Phone Number<sup className="text-pink-200">*</sup>
            </p>
            <div className='flex gap-1 '>
              <select name='dropdown' {...register("countryCode",{required:true})} className='w-[50px] bg-richblack-800 rounded-md text-richblack-25 text-[14px] sm:placeholder:text-[16px]' >
                {countrycode.map((code,index)=>
                {
                  // if we do nnot write value in input it take option childer as its value
                 return <option key={index}  value={code.code}>
                   {code.code+"-"+code.country}
                  </option>
                })}
              </select>
            <input
              required
              
              name="phone"
              type='tel'
              
              
              placeholder="12345-67890"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 text-[14px] sm:placeholder:text-[16px]"
              {...register("phonenumber",{required:{value:true, message:"Please Enter Phone No"},
              minLength:{value:8 ,message:"Invalid Phone Number"},
            maxLength:{value:10 ,message:"Invalid Phone Number"}})}

              
            />
            {
                errors.phonenumber &&  (<span>"Please Add Your Number.."</span>)
            }

            </div>
          </label>
             <label className='w-full'>
            <p className="mb-1  leading-[1.375rem] text-richblack-5 text-[14px] sm:placeholder:text-[16px]">
              Message<sup className="text-pink-200">*</sup>
            </p>
            <textarea
              required
              
              name="message"
              cols="30"
              rows="7"

              
              placeholder="Enter your message"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 text-[14px] sm:placeholder:text-[16px]"
              {...register("message",{required:true})}
              
            />
            {
                errors.message &&  (<span>"Please Add Your Message.."</span>)
            }
          </label>
        <ButtonAuth title={"Send Message"} />

    </form>
    </div>
  )
}

export default ContactForm