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

export const createCategory = (data,token)=>
{
  return async(dispatch)=>
  {
    const toastId=toast.loading("Creating Category");
    try 
    {
           const result=await apiConnector("POST",categories?.CREATE_CATEGORY_API,data,{
            Authorisation:`Bearer ${token}`
           }) ;
           console.log("Category created result: " + result);
           if(!result?.data?.success)
           {
             throw new Error("Could not Create Category")
           }
           toast.success("Category Created");
          toast.dismiss(toastId);
    }
    catch(error)
    {
        console.log("Error whilte creating category",error);
        toast.error(error.message);
    }
  }

}

export const deleteCategory = async(data,token)=>
{
  console.log(data);
  console.log(token);

  
    const toastId=toast.loading("Deleting Category");
    try 
    {
      console.log("i m in ")
           const result=await apiConnector("POST",categories?.DELETE_CATEGORY_API,{categoryId: data?.categoryId},{
            Authorisation:`Bearer ${token}`
           }) ;
           console.log("Category deleted result: " + result);
           if(!result?.data?.success)
           {
             throw new Error("Could not Create Category")
           }
           toast.success("Category Deleted");
          toast.dismiss(toastId);
    }
    catch(error)
    {
        console.log("Error whilte deleting category",error);
        toast.error(error.message);
    }
  

}
