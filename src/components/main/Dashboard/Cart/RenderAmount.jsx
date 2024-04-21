import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../../../../services/operations/studentPoints';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CourseDetails from '../../../../page/CourseDetails';

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch } = useForm();
  const [actualCost, setActualCost] = useState(total);
  const {course}=useSelector((store)=>store.course)

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("Bought these courses:", courses);
   let coinchecked= watch("coins");
    console.log(coinchecked);
    buyCourse(token, courses, user, navigate, dispatch,Math.floor(actualCost),coinchecked);
  };

  
  const calculateNewCost = (coinsChecked, total, user) => {
    let newCost = total;
    console.log("New cost:",course?.courseDetails);
    if (coinsChecked) {
      if(course?.courseDetails?.price>user?.coupanPoints)
      {
        newCost=course?.courseDetails?.price-200;
       
      }   
      else 
      {
        newCost=course?.courseDetails?.price-user?.coupanPoints;
       
      }
     
    }
  
    // Ensure that the new cost is at least 1
    newCost = Math.max(1, newCost);
  
    return newCost;
  };
  
  // Inside your component
  useEffect(() => {
    const coinsChecked = watch("coins");
    const newCost = calculateNewCost(coinsChecked, total, user);
    setActualCost(newCost);
  }, [watch("coins"), total, user?.coupanPoints]);
  

  return (
    <div className="min-w-[280px] w-[80%] lg:w-[30%] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-[16px] font-bold text-richblack-400">Total Amount:</p>
      <div className="flex items-center">
      <p className="mb-4 text-[20px] font-medium text-yellow-50">
  Rs {watch("coins") && user?.coupanPoints > 0 ? (
    <span style={{ textDecoration: 'line-through', color: "red", marginRight: '8px' }}>{total}</span>
  ) : null}
  {Math.floor(actualCost)}
</p>
      </div>
      <form onSubmit={handleSubmit(handleBuyCourse)}>
        <label htmlFor="coins" className="inline-flex items-center text-lg my-2">
          <input
            type="checkbox"
            id="coins"
            {...register("coins")}
            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
          />
          <span className="ml-2 text-richblack-400">Use Coins To Buy Course</span>
        </label>
        <button className="py-[5px] px-2 font-inter text-black bg-yellow-25 font-bold rounded-md w-full">
          Buy Now
        </button>
      </form>
    </div>
  );
};

export default RenderTotalAmount;
