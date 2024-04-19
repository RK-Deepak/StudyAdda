import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";

import { logout } from "./authAPI";
import { setUser } from "../../store/Slices/profleSlice";


const {UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
DELETE_PROFILE_API,
CHANGE_PASSWORD_API}=settingsEndpoints;



export const deleteAccount=(token,navigate)=>
{
    return async(dispatch)=>
    {
        const toastId=toast.loading("Deleting Account");
        
        try 
        {
           const response=await apiConnector("DELETE",`${DELETE_PROFILE_API}`,null,
           {
            Authorisation:`Bearer ${token}`
           }
           )
           console.log("DELETE_PROFILE_API API RESPONSE............", response)

           if(!response.data.success)
           {
              throw new Error(response.data.message)
           }

           toast.success("Account Deleted");
           dispatch(logout(navigate))
           
        }
        catch(error)
        {
            console.log("DELETE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId)
    }
}

export const changePassword=(token,formData)=>
{
   return async(dispatch) =>
   {

    const toastId=toast.loading("Updating Password")
    {
     try 
     {
        const response=await apiConnector("POST",`${CHANGE_PASSWORD_API}`,formData,
        {
            Authorization:`Bearer ${token}`
        })
        console.log("CHANGE_PASSWORD_API API RESPONSE............", response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);

        }
        toast.success("Password Successfully Updated");
        
     }
     catch(error)
     {
         console.log("CHANGE_PASSWORD_API API ERROR............", error)
         toast.error(error.response.data.message)
     }
    }
    toast.dismiss(toastId)
   }

}

export const updateProfile=(token,formData)=>
{
    return async(dispatch)=>
    {
        const toastId=toast.loading("Updating Profile");
        try 
        { 

               const response=await apiConnector("POST",UPDATE_PROFILE_API,formData,
               {
                Authorisation:`Bearer ${token}`
               })

               console.log("UPDATE_PROFILE_API API RESPONSE............", response)

               if (!response.data.success) {
                 throw new Error(response.data.message)
               }

               const userImage=response.data.updatedProfile.profileImage?response.data.updateProfile.profileImage:`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedProfile.firstName} ${response.data.updatedProfile.lastName}`
//updating in slice
               dispatch(setUser({...response.data.updatedProfile,profileImage:userImage}));

               toast.success("Profile Updated")


        }
        catch(error)
        {
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId)
    }
    
}

export const updateDisplayPicture=(token,formData)=>
{
    return async(dispatch)=>
    {
        const toastId=toast.loading("Updating Profile Image")
        try 
        {
            const response=await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,formData,
            {
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${token}`
            })
            console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
                response
              )
            if(!response.data.success)
            {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            dispatch(setUser({...response.data.data}))
        }
        catch(error)
        {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }

        toast.dismiss(toastId);
    }
}