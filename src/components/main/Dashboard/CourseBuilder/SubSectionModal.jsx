import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../store/Slices/courseSlice';

import { FaCross } from 'react-icons/fa';
import Upload from '../AddCourse/Upload';
import IconBtn from '../../common/IconBtn';
import { createSubSectionData,updateSubSectionData} from '../../../../services/operations/courseAPI';
import toast from 'react-hot-toast';


const SubSectionModal = ({modalData,setModalData,add=false,view=false,edit=false}) => {

    const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm();

    const {course,editcourse}=useSelector((store)=>store.course);
    const dispatch=useDispatch();
    const [loading,setloading]=useState(false);
    const {token}=useSelector((store)=>store.auth);

    useEffect(()=>
    {
       if(view || edit)
       {
        setValue("lectureTitle",modalData.title);
        setValue("lectureDesc",modalData.description);
        setValue("lectureVideo",modalData.videoURL)
       }
    },[])
    
    const isFormUpdataed=()=>
    {
        const currentValues=getValues();
        if(currentValues.lectureTitle!==modalData.title || currentValues.lectureDesc!==modalData.description ||
            currentValues.lectureVideo!==modalData.videoURL  )
            {
                return true;
            }
            else
            {
                return false
            }
    }

    const handleEditSubSection=async()=>
    {
        const currentValues=getValues();
        const formData=new FormData();

        formData.append("sectionId",modalData.sectionId);
        formData.append("subSectionId",modalData._id);

        if(currentValues.lectureTitle!==modalData.title)
        {
            formData.append("title",currentValues.lectureTitle);
        }
        if(currentValues.lectureDesc!==modalData.description)
        {
            formData.append("description",currentValues.lectureDesc);
        }
        if(currentValues.lectureVideo!==modalData.videoURL)
        {
            formData.append("videoURL",currentValues.lectureVideo)
        }

        //NOW ITS TIME TO UPDATE THE SECTION
        setloading(true);
        const result=await updateSubSectionData(formData,token);
        if(result)
        {
          dispatch(setCourse({...course,result}));
        }
        setModalData(null)
        setloading(false)
    }

    const onSubmit=async(data)=>
    {
       if(view)
       {
        return;
       }
       if(edit)
       {
         if(isFormUpdataed())
         {
            handleEditSubSection();
         }
         else 
         {
            toast.error("No changes made to the form")
         }
         return;
       }

       const formData=new FormData();
       formData.append("courseId",course._id)
       formData.append("sectionId",modalData);
       formData.append("title",data.lectureTitle);
       formData.append("description",data.lectureDesc);
       formData.append("videoURL",data.lectureVideo);

       setloading(true);

       const result=await createSubSectionData(formData,token)
       console.log(result)
       if(result)
       {
        dispatch(setCourse(result))
     }
       setModalData(null)
       setloading(false)
    }
  return (
    <div>
        <div>
        <div>
        <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
        <button onClick={()=>setModalData(null)}>
            <FaCross/>
            </button> 
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Upload
          name="lectureVideo"
          label="Lecture Video"
          register={register}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
          video={true}
          viewData={view?modalData.videoURL:null}
          editData={edit?modalData.videoURL:null}
         />
           <div>
                    <label>Lecture Title</label>
                    <input 
                        id='lectureTitle'
                        placeholder='Enter Lecture Title'
                        {...register("lectureTitle", {required:true})}
                        className='w-full text-green-600'
                    />
                    {errors.lectureTitle && (<span>
                        Lecture Title is required
                    </span>)}
                </div>
                <div>
                    <label>Lecture Description</label>
                    <textarea 
                        id='lectureDesc'
                        placeholder='Enter Lecture Description'
                        {...register("lectureDesc", {required:true})}
                        className='w-full min-h-[130px] text-green-600'
                    />
                    {
                        errors.lectureDesc && (<span>
                            Lecture Description is required
                        </span>)
                    }
                </div>
                {/* //if view is false it mean we are in edit or  create phase and according to that we will change button */}
                {
                 !view && (
                    <div>
                        <IconBtn text={loading?"Loading...":edit?"Save Changes":"Save"}/>
                    </div>
                 )
                }
        </form>
        </div>
    </div>
  )
}

export default SubSectionModal