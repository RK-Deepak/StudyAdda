import React, { useEffect, useState } from 'react'
import PurchaseCard from './PurchaseCard'
import { useSelector } from 'react-redux';
import { purchaseDetails } from '../../../../services/operations/studentPoints';

const PurchaseDetails = () => {

    const {token}=useSelector((store)=>store.auth);
    const [pdetails,setpdetails] = useState(null);

    const fetchPurchaseDetails=async()=>
    {
           const result=await purchaseDetails(token);
           console.log(result);
           setpdetails(result);
    } 

    useEffect(()=>
    {
        fetchPurchaseDetails();
    },[])
    
    if(pdetails===null)
    {
        return(
            <>
            <div className='loader w-full mx-auto'></div>
            
            </>
        )
    }
   
  
    // Assuming `pdetails` is an array of objects and each object has a `courses` property which is an array of courses
const totalCourses = pdetails.reduce((accumulator, element) => {
    // Use optional chaining to avoid errors if `element` or `element.courses` is undefined
    return accumulator + (element?.courses?.length || 0);
}, 0);

  return (
    <div className='flex flex-col gap-4  mx-auto my-4 font-inter  w-[75%]  '>
    <h1 className='text-3xl underline font-bold underline-offset-1 text-richblack-25'>Purchase Details</h1>
    <p className='text-md font-semibold text-richblack-100'>
  {pdetails?.length!==0 ? `${totalCourses} Courses Purchase Details` : "No Courses Purchase Details"}
</p>
    <hr className=' text-richblack-200'></hr>

    <div className='  flex flex-col gap-2 '>
    {
            pdetails?.map((item,index)=>{
                return(
                    <PurchaseCard key={item?._id} data={item}/>
                )
            })
    
    }
    </div>
    </div>
  
  )
}

export default PurchaseDetails