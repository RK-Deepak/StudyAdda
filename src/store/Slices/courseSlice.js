import { createSlice } from "@reduxjs/toolkit"
const initialState={
    step:2,
    course:null,
    editcourse:false,
    paymentloading:false
}

const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:
    {
        setStep:(state,action)=>
        {
            state.step=action.payload
        },
        setCourse:(state,action)=>
        {
            state.course=action.payload
        },
        setEditCourse:(state,action)=>
        {
            state.editcourse=action.payload
        },
        setPaymentloading:(state,action)=>
        {
            state.paymentloading=action.payload
        },
        resetCourseState:(state,action)=>
        {
            state.step=1
            state.course=null
            state.editcourse=false
        }
    }
})

export const {setStep,setCourse,setEditCourse,setPaymentloading,resetCourseState}=courseSlice.actions;
export default courseSlice.reducer