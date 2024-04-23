import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdCancel } from 'react-icons/md';
import ButtonAuth from '../../Auth/ButtonAuth';
import { fetchCourseCategories } from '../../../../services/operations/courseAPI';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory,deleteCategory } from '../../../../services/operations/categoriesAPI';
import ConfirmationModal from '../../common/ConfirmationModal2';

const CategoryCreate = () => {

  const {register,handleSubmit,formState:{errors},setValue}=useForm();
  const [existedCategory,setexistedCategory]=useState(null);
  const dispatch=useDispatch();
  const {token}=useSelector((store)=>store.auth);
  const [confirmationModal,setconfirmationModal]=useState(null);

  const fetchCategory=async()=>
  {
            const result=await fetchCourseCategories();
            console.log("hi",result);
            setexistedCategory(result);
  }

  useEffect(()=>
{



  fetchCategory();

},[])
   
  const onsubmit=(data)=>
  {
    
    console.log(data);
    dispatch(createCategory(data,token));

    setTimeout(() => {
      fetchCategory();
    }, 1000);
    setValue("name","");
    setValue("description","");
  }
  const deleteCat=(categoryId)=>
  {
    setconfirmationModal({
      text1:"Are you sure you want to delete this category?",
      btn1Text:"Delete",
      btn2Text:"Cancel",
      btn1Handler:()=>{
        deleteCategory({categoryId:categoryId},token);
        setTimeout(() => {
          fetchCategory();
        }, 1000);
        setconfirmationModal(null);
      },
     
      btn2Handler:()=>setconfirmationModal(null),
    })
    console.log(categoryId);
       
       
  }

  return (
    <>
    <div className="flex flex-col gap-4  w-full justify-center my-[40px] ">
      <>
      <h1 className='text-white text-center text-xl underline font-inter font-bold'>Category Point</h1>
      <form onSubmit={handleSubmit(onsubmit)} className='w-[80%] max-w-[300px] mx-auto flex flex-col gap-2'>
      <label>
            <p className="mb-1  leading-[1.375rem] text-richblack-5 text-[14px] sm:placeholder:text-[16px]">
              Category Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="name"
            
            
              placeholder="Enter category name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 text-[14px] sm:placeholder:text-[16px]"
              {...register("name",{required:true})}
            />
            {
                errors.lastName && <span>Please Enter Category Name</span>
            }
          </label>

          <label>
            <p className="mb-1  leading-[1.375rem] text-richblack-5 text-[14px] sm:placeholder:text-[16px]">
              Category Description <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="description"
            
            
              placeholder="Enter category description"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 text-[14px] sm:placeholder:text-[16px]"
              {...register("description",{required:true})}
            />
            {
                errors.lastName && <span>Please Enter Category Description</span>
            }
          </label>
          <div className='flex gap-2 items-center justify-center '>
           
        <ButtonAuth title={"Create"} categorySpecific={true}/>
        </div>
      </form>
      </>
      <div className='flex gap-2 flex-col  items-center justify-center'>
        <p className='font-bold text-white'>Existed Categories:-</p>
        <div className='flex gap-2'>
      {existedCategory && existedCategory?.map((category,index)=>
    {
     return <span className=' p-2 rounded-md bg-green-500 font-bold text-white font-inter flex gap-2 items-center' key={category?._id}>{category?.name} <MdCancel className='text-white' onClick={()=>deleteCat(category?._id)}/></span>
    })}
   
      </div>
      </div>
    </div>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
    
  )
}

export default CategoryCreate