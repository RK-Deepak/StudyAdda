import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../Slices/authSlice";
import profleSlice from "../Slices/profleSlice";
import cartSlice from "../Slices/cartSlice";
import courseSlice from "../Slices/courseSlice";
import viewCourseSlice from "../Slices/viewCourseSlice";
import sideBarSlice from "../Slices/sideBarSlice";


const rootReducer=combineReducers({
    auth:authSlice,
    profile:profleSlice,
    cart:cartSlice,
    course:courseSlice,
    viewCourse:viewCourseSlice,
    SideBar:sideBarSlice,

})

export default rootReducer;