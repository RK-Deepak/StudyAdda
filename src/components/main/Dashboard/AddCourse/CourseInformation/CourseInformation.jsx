import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails} from '../../../../../services/operations/courseAPI';
import {  setCourse, setStep } from '../../../../../store/Slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/contants';
import { FaRupeeSign } from "react-icons/fa";

import Requiremnts from '../Requiremnts';
import Upload from '../Upload';
import IconBtn from '../../../common/IconBtn';
import ChipInput from "../../../Dashboard/AddCourse/CourseInformation/ChipInput.jsx"
import toast from 'react-hot-toast';
import { useLocation, useParams } from 'react-router-dom';
import { getAllCategories } from '../../../../../services/operations/categoriesAPI.js';


const CourseInformation = () => {

    const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm();

    const dispatch=useDispatch();
    const {token}=useSelector((store)=>store.auth);
    const {course,editcourse}=useSelector((store)=>store.course);
    const [loading,setlaoding]=useState(false);
    const [courseCategories,setCourseCategories]=useState([]);
    const {courseId}=useParams();
    const location=useLocation();

    //fetching categories initially while loading page
     const getCourseCategories=async ()=>
     {
        setlaoding(true);
        const allcategories=await getAllCategories();
        console.log(allcategories)
        if(allcategories.length>0)
        {
            setCourseCategories(allcategories)
        }
        setlaoding(false)
     }
   

     useEffect(()=>
     {
        //if editCourse iS true it means data is already present so
        //we need to pre-set it 
        if(editcourse && course)
        {

            setValue("courseTitle",course?.courseName);
            setValue("courseShortDesc",course?.courseDescription);
            setValue("coursePrice",course?.price);
            setValue("courseTags",course?.tag);
            setValue("courseBenefits",course?.whatYouwillLearn);
            setValue("courseCategory",course?.category);
            setValue("courseRequirements",course?.instructions);
            setValue("courseImage",course?.thumbnail);
            setValue("courseLanguage",course?.language)
        }
        getCourseCategories();
     },[course,editcourse])


     //form updation hua hai ya nhi 
     const isFormUpdated=()=>
     {
        //getting current form value
        const currentValues=getValues();
        if(currentValues.courseTitle!==course.courseName ||
            currentValues.courseShortDesc!==course.courseDescription ||
            currentValues.coursePrice !==course.price ||
            currentValues.courseBenefits !== course.whatYouwillLearn ||
            currentValues.courseCategory._id!==course.category._id ||
            currentValues.courseLanguage!==course.language ||
            currentValues.courseRequirements.toString()!==course.instructions.toString() ||
            currentValues.courseTags.toString() !==course.tag.toString() ||
            currentValues.courseImage !==course.thumbnail
             )
             {
                return true
             }
             else 
             {
                return false;
             }

     }



  //handle next button click
    const onSubmitForm=async (data)=>
    {
      console.log(data)
        // this is for course editted not for new course
        // if form is edited or not
         if(editcourse)
         {
            //if form is updated or not
            if(isFormUpdated())
            {
                const currentValues=getValues();
                //create instance of formdata and append data in it
                const formData=new FormData();

                formData.append("courseId",course._id);
                if(currentValues.courseTitle!==course.courseName)
                {
                    formData.append("courseName",data.courseTitle)
                }
                if(currentValues.courseShortDesc!==course.courseDescription)
                {
                    formData.append("courseDescription",data.courseShortDesc)
                }
                if(currentValues.coursePrice!==course.price)
                {
                    formData.append("price",data.coursePrice);
                }
                if(currentValues.courseBenefits!==course.whatYouwillLearn)
                {
                    formData.append("whatYouwillLearn",data.courseBenefits);
                }
                if(currentValues.courseCategory._id!==course.category._id)
                {
                    formData.append("category",data.courseCategory);
                }
                if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
                if(currentValues.language !== course.courseLanguage) {
                    formData.append("language",data.language);
                }

                if (currentValues.courseImage !== course.thumbnail) {
                  formData.append("thumbnail", data.courseImage)
                }

                
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                  formData.append("tag", JSON.stringify(data.courseTags))
                }

                setlaoding(true);
                const result=await editCourseDetails(formData,token);
                console.log(result);
                setlaoding(false);
                if(result)
                {
                    dispatch(setStep(2));
                    dispatch(setCourse(result))
                }
                else
                {
                    toast.error("No Changes Made In Info")
                }

                

return;
            }
         }

        //create a course 
        const formData=new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouwillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("language",data.courseLanguage)
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("thumbnail",data.courseImage);
        formData.append("tag",JSON.stringify(data.courseTags))

        setlaoding(true);
        console.log("formdara",formData.get("courseName"));
         console.log("token",token)
        const result=await addCourseDetails(formData,token);
        if(result)
        {
            dispatch(setStep(2));
            dispatch(setCourse(result))

        }
        setlaoding(false);
        console.log("PRINTING FORMDATA", formData);
        console.log("PRINTING result", result);

    }
    


  return (
    <form  className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8' onSubmit={handleSubmit(onSubmitForm)}>
      {/* course Title */}
      <div className="flex flex-col space-y-2">
          <label className='text-sm text-richblack-5' htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
          </label>
          <input id="courseTitle" placeholder='Enter Course Title'
          {...register("courseTitle",{required:true})} className="form-style w-full"/>
          {
        errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
            
          </span>
         
        )
          }
      </div>
   
     
      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>
      {/* course price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <FaRupeeSign className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>
      {/* Course category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
       <select {...register("courseCategory",{required:true})}
       defaultValue=""
       id="courseCategory"
       className="form-style w-full px-2"
       >
        <option value="" disabled>
            Choose a Category
        </option>
        {
            !loading && courseCategories?.map((category,index)=>
            {
                return <option value={category?._id} key={index}>{category?.name}</option>
            })
        }


       </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>
      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
      {/* Course Tags */}
      <ChipInput
      label="Tags"
      name="courseTags"
      placeholder="Enter Tags and press Enter"
      register={register}
      setValue={setValue}
      getValues={getValues}
      errors={errors}
      />
      {/* Course Requirements */}
      <Requiremnts
      name="courseRequirements"
      label="Requirements/Instructions"
      placeholder="Enter Instructions.."
      register={register}
      setValue={setValue}
      getValues={getValues}
      errors={errors}
      />
      <Upload
      name="courseImage"
      label="Course Thumbnail"
      register={register}
      setValue={setValue}
      errors={errors}
      getValues={getValues}
      editData={editcourse?course?.thumbnail :null}

      />

<div className="flex flex-col space-y-2">
          <label className='text-sm text-richblack-5' htmlFor="courseLanguage">
          Course Language <sup className="text-pink-200">*</sup>
          </label>
          <input id="courseLanguage" placeholder='Enter Course Language'
          {...register("courseLanguage",{required:true})} className="form-style w-full"/>
          {
        errors.courseLanguage && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Language is required
          </span>
        )
          }
      </div>
      {/* Next button */}
      <div className="flex justify-end gap-x-2">
        {/* if editcourse is true it mean we have to may be edit in next and  */}
        {/* we only show continue without saving when we are in edit mode */}
        {editcourse && 
        <button
        onClick={()=>dispatch(setStep(2))}
        disabled={loading}
        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
            Continue Without Saving
        </button> }
        <IconBtn disabled={loading}
        text={!editcourse ?"Next":"Save Changes"}/>
      </div>

    </form>
  )
}

export default CourseInformation