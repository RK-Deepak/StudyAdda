import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/studentPoints';
import { useNavigate } from 'react-router-dom';


const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state) => state.cart);
    const {token}=useSelector((store)=>store.auth);
    const {user}=useSelector((store)=>store.profile)
    const navigate=useNavigate();
    const dispatch=useDispatch();


    const handleBuyCourse = () => {
      //in this in buynow we want course id so each courses in cart present when we click on buy now we want all courses id
        const courses = cart.map((course) => course._id);
        console.log("Bought these course:", courses);
         buyCourse(token,courses,user,navigate,dispatch)
    }
  return (
    <div className="min-w-[280px] w-[80%] lg:w-[30%] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">

        <p className="mb-1 text-[16px] font-bold text-richblack-400">Total Amount:</p>
        <p className="mb-6 text-[20px] font-medium text-yellow-50">Rs {total}</p>

        <IconBtn
            text="Buy Now"
            onclick={handleBuyCourse}
            customClasses={"w-full justify-center"}
        />
        
    </div>
  )
}

export default RenderTotalAmount
