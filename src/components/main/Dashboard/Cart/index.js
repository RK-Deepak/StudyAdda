import { useSelector } from "react-redux";
import RenderTotalItems from "./RenderTotalItems";
import RenderAmount from "./RenderAmount";


export default function Cart()
{
    const {totalItems,total}=useSelector((store)=>store.cart);


    return (
       <div className="text-white">
            <h1> Your Cart</h1>
            <p>{totalItems} Courses in Cart</p>

            {total > 0 
            ? (<div>
          
                <RenderTotalItems/>
                <RenderAmount/>
            </div>)
            : (<p>Your Cart is Empty</p>)}
        </div>
    )
}