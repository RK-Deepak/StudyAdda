import React, { useEffect, useState } from 'react';
import { MdEditNote } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';


const Myprofile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {user,loading:profileloading}=useSelector((store)=>store.profile);
    const {loading:authLoading}=useSelector((store)=>store.auth)
    console.log(user)
    
    if (!user || profileloading || authLoading ) {
        return <div className='loader mx-auto'></div>; // or any other loading indicator
    }
     

  

    const { profileImage, additionalData, firstName, lastName, email,coupanPoints } = user;

    return (
        <div className='flex flex-col gap-4 w-full max-w-[900px] mx-auto p-5'>
            
            {/* section-1 */}
            <div className='flex gap-2 flex-col'>
            <p className='text-white text-md font-semibold'>Home{" "}/{" "}Dashboard{" "}/{" "}<span className=' text-red-300'>My Profile</span></p>
                <h1 className='text-white  text-2xl '>My Profile</h1>
            </div>
            <div className='bg-richblack-700 min-h-[100px] w-full p-3 flex flex-col sm:flex-row justify-center sm:justify-between  items-center rounded-md gap-2 '>
                {/* left*/}
                 <div className='w-full '>
                    <div className='flex gap-2 items-center '>
                        <img src={profileImage} alt='profile/png' className=' w-[50px] sm:w-[80px] rounded-full aspect-square object-top object-cover' />
                        <div>
                            <p className='text-white text-sm sm:text-xl font-bold font-inter'>{firstName + " " + lastName}</p>
                            <p className='text-white text-xs  sm:text-sm font-semibold font-inter'>{email}</p>
                        </div>
                    </div>
                </div>
                {/* right */}
                <div className='flex items-center gap-1 px-3 py-2 font-inter font-semibold bg-yellow-50 rounded-md cursor-pointer' onClick={()=>navigate("/dashboard/settings")}>
                    <MdEditNote />
                    <span >Edit</span>
                </div>
            </div>
            {/* Section-2 */}
            <div className='bg-richblack-700 min-h-[200px] w-full p-3  rounded-md  flex-col sm:flex-row justify-center sm:justify-between'>
                <h1 className="text-richblack-100 text-lg font-semibold font-inter underline underline-offset-1 my-2 text-center sm:text-start">About Me</h1>
                <div className='w-full flex justify-between items-center flex-wrap gap-3 flex-col sm:flex-row '>
                    {additionalData?.about !== null ? (
                        <p className='text-white text-sm font-normal font-inter'>{additionalData?.about}</p>
                    ) : (
                        <p className='text-white text-sm font-semibold font-inter'>Please add your intro</p>
                    )}
                    <div className='flex items-center gap-1 px-3 py-2 font-inter font-semibold bg-yellow-50 rounded-md cursor-pointer' onClick={()=>navigate("/dashboard/settings")}>
                        <MdEditNote />
                        <span >Edit</span>
                    </div>
                </div>
            </div>
            {/* Section-3 */}
            <div className='bg-richblack-700 min-h-[200px] w-full p-3  rounded-md flex flex-col gap-2 flex-wrap'>
                <div className='flex justify-between items-center'>
                    <h1 className="text-richblack-100 text-lg font-semibold font-inter underline underline-offset-1 my-2">Personal Details</h1>
                    <div className='flex items-center gap-1 px-3 py-2 font-inter font-semibold bg-yellow-50 rounded-md cursor-pointer' onClick={()=>navigate("/dashboard/settings")}>
                        <MdEditNote />
                        <span >Edit</span>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    <div>
                        <p className='font-semibold text-richblack-900 text-[12px] font-inter underline'>Date Of Birth:</p>
                        <p className='text-sm font-inter font-medium text-[15px] text-richblack-50'>{additionalData.dateOfBirth !== null ? additionalData.dateOfBirth : "Data Unavilable"}</p>
                    </div>
                    <div>
                        <p className='font-semibold text-richblack-900 text-[12px] font-inter underline'>Gender:</p>
                        <p className='text-sm font-inter font-medium text-[15px] text-richblack-50'>{additionalData.gender !== null ? additionalData.gender : "Data Unavilable"}</p>
                    </div>
                    <div>
                        <p className='font-semibold text-richblack-900 text-[12px] font-inter underline'>Profession:</p>
                        <p className='text-sm font-inter font-medium text-[15px] text-richblack-50'>{additionalData.profession !== null ? additionalData.profession : "Data Unavilable"}</p>
                    </div>
                    <div>
                        <p className='font-semibold text-richblack-900 text-[12px] font-inter underline'>Contact Number:</p>
                        <p className='text-sm font-inter font-medium text-[15px] text-richblack-50'>{additionalData.contactNumber !== null ? additionalData.contactNumber : "Data Unavilable"}</p>
                    </div>
                    
                </div>
               
            </div>
        </div>
    );
};

export default Myprofile;
