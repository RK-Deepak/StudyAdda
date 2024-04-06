import { useSelector } from "react-redux";
import RenderTotalItems from "./RenderTotalItems";
import RenderAmount from "./RenderAmount";


export default function Cart()
{
    const {totalItems,total}=useSelector((store)=>store.cart);


    return (
       <div className="flex flex-col gap-2 w-[80%] mx-auto">
            <h1 className="mb-10 text-3xl font-medium text-richblack-5 mt-2"> Your Cart</h1>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems} Courses in Cart</p>

            {total > 0 
            ? (<div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row ">
          
                <RenderTotalItems/>
                <RenderAmount/>
            </div>)
            : (<p className="mt-14 text-center text-3xl text-richblack-100">Your Cart is Empty</p>)}
        </div>
    )
}