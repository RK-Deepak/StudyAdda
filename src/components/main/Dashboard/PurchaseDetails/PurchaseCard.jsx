import React from 'react';
import { formatDate } from '../../../../utils/dateFormatter';
import { FaOpencart } from 'react-icons/fa';

const PurchaseCard = ({ data }) => {
    console.log("inside purchase card", data);
    const { courses, razorpay_order_id, razorpay_payment_id, createdAt } = data;

    return (
        <>
            {courses?.map((course, index) => (
                <div key={index} className='flex flex-col md:flex-row border border-richblack-300 bg-richblack-700 p-4 rounded-md justify-between gap-6'>
                    {/* left */}
                    <div className='flex flex-col gap-2'>
                        <img src={course?.thumbnail} alt='course_iamge' className='w-full h-[150px] object-fill rounded-md' />
                        <div>
                            <p className='text-richblack-200 font-semibold'>{course?.courseName}</p>
                            <p className='text-richblack-200 font-semibold'>{course?.courseDescription}</p>
                            <p className='text-richblack-200 font-semibold'>{formatDate(createdAt)}</p>
                        </div>
                    </div>
                    <p className='text-5xl text-green-600'>
                        <FaOpencart />
                    </p>
                    <div className='text-white flex flex-col gap-2'>
                        <>
                            <p className='text-lg underline underline-offset-1'>Order Details:</p>
                            <p className='text-red-400 font-semibold'>Price: <span className='text-green-600 font-medium'>₹ {course?.price}</span></p>
                            <p className='text-red-400 font-semibold'>Order Id: <span className='text-green-600 font-medium'>{razorpay_order_id}</span></p>
                            <p className='text-red-400 font-semibold'>Payment Id: <span className='text-green-600 font-medium'>{razorpay_payment_id}</span></p>
                        </>
                    </div>
                </div>
            ))}
        </>
    );
}

export default PurchaseCard;
