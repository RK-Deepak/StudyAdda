import { categories } from "../apis";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast"

export const getAllCategories=async(data,token)=>
{
      let result=null;
  
    try 
      {
          const response=await apiConnector("GET",categories.CATEGORIES_API);;
          console.log(response?.data?.data);
          if(!response?.data?.success)
              throw new Error("Could not Fetch Category page data");
          result=response?.data?.data;
      }
      catch(error)
      {
        console.log("CATALOG PAGE DATA API ERROR....", error);
        toast.error(error.message);
        result = error.response?.data;
      }

      return result;
      

}
export const getCatalogaPageData = async(categoryId) => {
    console.log(categoryId);
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
          const response = await apiConnector("POST",categories.GET_ALL_CATEGORIES_DETAILS_API, 
          {categoryId: categoryId});
          console.log(response)

          
          if(!response?.data?.success)
              throw new Error("Could not Fetch Category page data");
  
           result = response?.data;
  
    }
    catch(error) {
      console.log("CATALOG PAGE DATA API ERROR....", error);
      toast.error(error.message);
      result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
  }
  
