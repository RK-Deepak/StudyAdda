import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../Slices/authSlice";
import profleSlice from "../Slices/profleSlice";
import cartSlice from "../Slices/cartSlice";
import courseSlice from "../Slices/courseSlice";

const rootReducer=combineReducers({
    auth:authSlice,
    profile:profleSlice,
    cart:cartSlice,
    course:courseSlice

})

export default rootReducer;