import toast from "react-hot-toast"
import { profileEndpoints } from "../apis"
import { apiConnector } from "../apiConnector";
import { setLoading } from "../../store/Slices/profleSlice";
import { setUser } from "../../store/Slices/profleSlice";
import { logout } from "./authAPI";

const {GET_USER_ENROLLED_COURSES_API,GET_USER_DETAILS_API,GET_INSTRUCTOR_DETAILS_API}=profileEndpoints

//if i m dispatching it i need return async thunk otherwaise direct call it
export async function getUserEnrolledCourses(token)
{
    
       const toastId=toast.loading("Getting Enrolled Courses");
       let result=[];
       try 
       {
         const response=await apiConnector("GET",GET_USER_ENROLLED_COURSES_API,null,{
            Authorisation: `Bearer ${token}`
         })

          console.log(
      "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
      response)

         if(!response.data.success)
         {
            throw new Error(response.data.message);
         }

         result=response.data.data
       }
       catch(error)
       {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
       }
    
       toast.dismiss(toastId)
       return result;
}

export async function getUserDetails(token,navigate)
{
    return async(dispatch)=>
    {
        const toastId=toast.loading("Getting User Details");
        dispatch(setLoading(true));
        try
        {
           const response=await apiConnector("GET",GET_USER_DETAILS_API,null,{
            Authorization:`Bearer ${token}`
           })
           console.log("GET_USER_DETAILS API RESPONSE............", response)
           
           if (!response.data.success) {
            throw new Error(response.data.message)
          }

          const userImage=response.data.data.profileImage?
                         response.data.data.profileImage:
                         `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
                         dispatch(setUser({ ...response.data.data, image: userImage }))
        }
        catch(error)
        {
            dispatch(logout(navigate))
            console.log("GET_USER_DETAILS API ERROR............", error)
            toast.error("Could Not Get User Details")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export async function getInstructorDashboardDetails(token)
{
    let result=null;
    const toastId=toast.loading("Fetching...")
    try 
    {
        let response=await apiConnector("GET",GET_INSTRUCTOR_DETAILS_API,null,
        {
          Authorisation:`Bearer ${token}`
        })
        console.log("GET_USER_DASHBOARD_DETAILS............", response);
        result=response?.data?.data;
  
        if(!response.status)
        {
          throw new Error(response.data.message);
        }
    }
    catch(error)
    {
        console.log("GET_USER_DETAILS API ERROR............", error)
        toast.error("Could Not Get Instuctor Details");
    }

    toast.dismiss(toastId);
    return result;
    

    
}