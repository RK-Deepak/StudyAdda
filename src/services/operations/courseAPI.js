import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { categories, courseEndPoints } from "../apis";

const {CATEGORIES_API}=categories;
const {CREATE_COURSE_API,EDIT_COURSE_API,CREATE_SECTION_API}=courseEndPoints
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
export const addCourseDetails=async (formData,token)=>
{
    let result=null
    console.log(token);
    console.log(formData.get("courseName"))
    const toastId=toast.loading("Loading...")
    console.log(CREATE_COURSE_API)
    try 
    {
         const response=await apiConnector("POST",CREATE_COURSE_API,formData,
         {
          "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
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
export const editCourseDetails=async(formdata,token)=>
{
  let result=null;
 const toastId= toast.loading("Updating...");
 try 
 {
  const response=await apiConnector("POST",EDIT_COURSE_API,formdata,{
    Authorisation:`Beare ${token}`
  });
  console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated..");
    result=response.data.data
 }
 catch (error) {
  console.log("EDIT COURSE API ERROR............", error)
  toast.error(error.message)
}
toast.dismiss(toastId);
return result;

}
export const createSectionData=async(data,token)=>
{
  let result=null;
  const toastId=toast.loading("Loading..")
  try 
  {
    const response=await apiConnector("POST",CREATE_SECTION_API,data,
    {
      Authorisation:`Bearer ${token}`
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result=response.data.data


  }
  catch(error)
  {
console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId);
  return result;
}
export const updateSectionData=async(data,token)=>
{
  let result=null;
  const toastId=toast.loading("Updating..");
  try 
  {
     const response=await apiConnector("POST",data,{
      Authorisation:`Bearer ${token}`
     })
     console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result=response.data.data
  }
  catch(error)
  {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId);
  return result;
}