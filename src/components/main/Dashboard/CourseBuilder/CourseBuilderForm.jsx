import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../common/IconBtn';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NestedCourseView from './NestedCourseView';
import {BiRightArrow} from "react-icons/bi"
import { createSectionData,updateSectionData } from '../../../../services/operations/courseAPI';
import { setCourse, setEditCourse, setStep } from '../../../../store/Slices/courseSlice';
import toast from 'react-hot-toast';

const CourseBuilderForm = () => {

    const {setValue,getValues,register,formState:{errors},handleSubmit}=useForm();
    const[editSectionName,setEditSectionName]=useState(null);
    const {course}=useSelector((store)=>store.course)
    const dispatch=useDispatch();
    const {token}=useSelector((store)=>store.auth);
    const [loading,setloading]=useState(false);

    useEffect(()=>
    {
      console.log("updated")
      
    },[course])

   

    const submitHandler=async (data)=>
    {
         //setlaoding true
         setloading(true);
         let result;
         if(editSectionName)
         {
            
          result=await updateSectionData({
            sectionName:data.sectionName,
            sectionId:editSectionName,
            courseId:course._id
          },token)

 }
         else 
         {
            result=await createSectionData({
                sectionName:data.sectionName,
                courseId:course._id
              },token)
         }

         if(result)
         {
            dispatch(setCourse({...course,...result}));

            
            setEditSectionName(null)
            setValue("sectionName","")
         
            console.log(result)
         }
         setloading(false)
    }
    const cancelEdit=()=>
    {
        setEditSectionName(null)
      setValue("sectionName","")
    }

    const handleChangeEditSectionName=async(sectionId,sectionName)=>
    {
        console.log("handling change",sectionId,sectionName)
        //when we again click on pencil
       if(editSectionName===sectionId)
       {
        cancelEdit();
        return;
       }
       //when we first click on pencil
       
       setEditSectionName(sectionId);
       setValue("sectionName",sectionName)
    }

    const goBack=()=>
    {
       dispatch(setStep(1));
       dispatch(setEditCourse(true))
    }

    const goToNext=()=>
    {
       //if we have section as well as subsection than only we can go to publicsj

       if(course?.courseContent?.length===0)
       {
        toast.error("Please add atleast one Section");
        return;
       }
       if(course?.courseContent.some((section)=>section?.subSection?.length===0))
       {
        toast.error("Please add atleast one Sub Section");
        return;
       }
        //if everything is good
    dispatch(setStep(3));
    }
  

  return (
    <div className='text-white'>
         <p>Course Builder</p>
         {/* Section creation phase */}
      <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col space-y-2">
        <label htmlFor='sectionName' className='text-sm text-richblack-5'>Section name:<sup className="text-pink-200">*</sup></label>
        <input type="text" 
        {...register("sectionName",{required:true})}
        id="sectionName"
        placeholder='Add Section Name'
        className='form-style w-full'
        />
        {/* Errors in section creation phase */}
        {
         errors.editSectionName && ( <span 
            className="ml-2 text-xs tracking-wide text-pink-200">Section Name is required</span>)
        }
        
        </div>
        <div className='mt-10 flex w-full'>
            <IconBtn
            type="Submit" 
            text={editSectionName?"Edit Section Name":"Create Section"}
            outlien={true}
            customClasses={"text-white"}
            />
            {
                editSectionName && 
                (
                    <button type='button'
                    onClick={cancelEdit}
                    className='text-sm text-richblack-300 underline ml-10'>
                        Cancel Editing
                    </button>
                )
            }
        </div>
       
      </form>
     {/* if i add a section name a section name and option should get created} */}
      {
        
          course?.courseContent?.length>0 && (
            <NestedCourseView handleChangeEditSectionName={handleChangeEditSectionName}/>
          )
      }

<div className='flex justify-end gap-x-3 mt-10'>
        <button
        onClick={goBack}
        className='rounded-md cursor-pointer flex items-center '>
          Back
        </button>
        <IconBtn text="Next" onclick={goToNext}>
          <BiRightArrow />
        </IconBtn>

      </div>

    </div>
  )
}

export default CourseBuilderForm