import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState={
  // total no of items
    totalItems:localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0,
    //items in cart
    cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
    //total amount 
    total:localStorage.getItem("total")?JSON.parse(localStorage.getItem("total")):0

}
const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
      addToCart:(state,action)=>
      {
        const course=action.payload;
        //checkig if course is already added or not
        const index=state.cart.findIndex((item)=>item._id===course._id);

        if(index>=0)
        {
          toast.error("Course Is Already Added");
          return
        }

        //if the curse is not in the cart 
         
        //push in cart increment totalItems,total amount and also localStorage
        state.cart.push(course);
        state.totalItems++;
        state.total=state.total+course.price;

        //updating local storage
        localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
        localStorage.setItem("total",JSON.stringify(state.total));
        localStorage.setItem("cart",JSON.stringify(state.cart))

      toast.success("Course Added In Cart")

      },

      removeFromCart:(state,action)=>
      {
        const courseid=action.payload;
        const index=state.cart.findIndex(item=>item._id===courseid);

        if(index>=0)
        {
          //if the course is dound we have to remove it
          //remove totalItems
          state.totalItems--;
          //also decrease the total amount
          state.total-=state.cart[index].price;
          //remove from cart also 
          state.cart.splice(index,1);

          //remove from localStorage
          localStorage.setItem("cart",JSON.stringify(state.cart));
          localStorage.setItem("total",JSON.stringify(state.total));
          localStorage.setItem("totalItems",JSON.stringify(state.totalItems));

          toast.success("Course removed from cart")

          
        }

      },
      resetCart:(state)=>
      {
        state.totalItems=0;
        state.total=0;
        state.cart=[];
        localStorage.removeItem("totalItems");
        localStorage.removeItem("total");
        localStorage.removeItem("cart")
      }
    }
})

export const {addToCart,resetCart,removeFromCart}=cartSlice.actions;
export default cartSlice.reducer