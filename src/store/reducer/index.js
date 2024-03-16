import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../Slices/authSlice";
import profleSlice from "../Slices/profleSlice";
import cartSlice from "../Slices/cartSlice";

const rootReducer=combineReducers({
    auth:authSlice,
    profile:profleSlice,
    cart:cartSlice

})

export default rootReducer;