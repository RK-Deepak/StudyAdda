import { apiConnector } from "../apiConnector";
import {contactAPI} from "../../services/apis.js"
import toast from "react-hot-toast";

export const contactSubmission=(formData)=>
{
    return async(dispatch)=>
    {
        const toastId=toast.loading("Submitting Form");
        try 
        {
            const {firstName,lastName,email,message,phonenumber,countryCode}=formData;

            const response=await apiConnector("POST",`${contactAPI.CONTACT_API}`,
            {
                 firstName,
                 lastName,
                 email,
                 phonenumber,
                 message,
                 countryCode
            })
            console.log("form submission",response);
            if(!response.data.success)
            {
                throw new Error(response.data.message)
            }
            toast.success("Form Submitted");
        }
        catch(error)
        {
           toast.error("Form Submissin Issue")
        }
        toast.dismiss(toastId)
        

    }
} 