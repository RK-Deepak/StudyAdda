import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { categories, courseEndPoints } from "../apis";

const {CATEGORIES_API}=categories;
const {CREATE_COURSE_API}=courseEndPoints
export const fetchCourseCategories=async ()=>
{
      let result=[];
        
      try 
      {
         const response=await apiConnector("GET",CATEGORIES_API);
         console.log("COURSE_CATEGORIES_API API RESPONSE............", response);
         if(!response?.data?.success)
         {
            throw new Error("Could not Fetch Course Categories")
         }

         result=response?.data?.allTags
      }
      catch(error)
      {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error("Unable To fetch Categories")
      }
      return result;
}
export const addCourseDetails=async (formdata,token)=>
{
    let result=null
    const toastId=toast.loading("Loading...")
    try 
    {
         const response=await apiConnector("POST",CREATE_COURSE_API,formdata,
         {
            Authorization:`Bearer ${token}`
         })

         console.log("CREATE COURSE API RESPONSE............", response)
         if (!response?.data?.success) {
           throw new Error("Could Not Add Course Details")
         }
         toast.success("Course Details Added Successfullly");
         result=response?.data?.data

    }
    catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
      }
      toast.dismiss(toastId)
  return result
}