import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, fetchCourseCategories } from '../../../../services/operations/courseAPI';
import { setCourse, setStep } from '../../../../store/Slices/courseSlice';
import { COURSE_STATUS } from '../../../../utils/contants';
import { FaRupeeSign } from "react-icons/fa";
import ChipInput from './ChipInput';
import Requiremnts from './Requiremnts';

const CourseInformation = () => {

    const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm();

    const dispatch=useDispatch();
    const {token}=useSelector((store)=>store.auth);
    const {course,editcourse}=useSelector((store)=>store.course);
    const [loading,setlaoding]=useState(false);
    const [courseCategories,setCourseCategories]=useState([])

    //fetching categories initially while loading page
     const getCourseCategories=async ()=>
     {
        setlaoding(true);
        const allcategories=await fetchCourseCategories();
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
        if(editcourse)
        {
            setValue("courseTitle",course.courseName);
            setValue("courseShortDesc",course.courseDescription);
            setValue("coursePrice",course.price);
            setValue("courseTags",course.tag);
            setValue("courseBenefits",course.whatYouwillLearn);
            setValue("courseCategory",course.category);
            setValue("courseRequirements",course.instructions);
            setValue("courseImage",course.thumbnail);
            setValue("courseLanguage",course.language)
        }
        getCourseCategories();
     },[])


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
        //this is for course editted not for new course
        //if form is edited or not
        //  if(editcourse)
        //  {
        //     //if form is updated or not
        //     if(isFormUpdated())
        //     {
        //         const currentValues=getValues();
        //         //create instance of formdata and append data in it
        //         const formData=new FormData();

        //         formData.append("courseId",course._id);
        //         if(currentValues.courseTitle!==course.courseName)
        //         {
        //             formData.append("courseName",data.courseTitle)
        //         }
        //         if(currentValues.courseShortDesc!==course.courseDescription)
        //         {
        //             formData.append("courseDescription",data.courseShortDesc)
        //         }
        //         if(currentValues.coursePrice!==course.price)
        //         {
        //             formData.append("price",data.coursePrice);
        //         }
        //         if(currentValues.courseBenefits!==course.whatYouwillLearn)
        //         {
        //             formData.append("whatYouwillLearn",data.courseBenefits);
        //         }
        //         if(currentValues.courseCategory._id!==course.category._id)
        //         {
        //             formData.append("category",data.courseCategory);
        //         }
        //         if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
        //             formData.append("instructions", JSON.stringify(data.courseRequirements));
        //         }
        //         if(currentValues.language !== course.courseLanguage) {
        //             formData.append("language",course.language);
        //         }

        //         setlaoding(true);

                


        //     }
        //  }

        //create a course 
        const formData=new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("language",data.courseLanguage)
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("thumbnail",data.courseImage);
        formData.append("tag",JSON.stringify(data.courseTags))

        setlaoding(true);
        console.log(formData);
         
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
            !loading && courseCategories.map((category,index)=>
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

    </form>
  )
}

export default CourseInformation