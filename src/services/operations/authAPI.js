import toast from "react-hot-toast"
import { endpoints } from "../apis"
import { setLoading, setToken } from "../../store/Slices/authSlice"
import { apiConnector } from "../apiConnector"
import { setUser } from "../../store/Slices/profleSlice"


const {SENDOTP_API,
SIGNUP_API,
LOGIN_API,
RESETPASSWORDTOKEN_API,
RESETPASSWORD_API}=endpoints
// sendotp fn,it is not normal fn its thunk fn
// Dispatching a Thunk: When you dispatch a thunk created by an action creator (like sendOtp in your example), you're dispatching a function. Redux Thunk intercepts this function and invokes it with dispatch and getState arguments. This allows you to perform asynchronous operations inside the thunk and dispatch actions based on the results of those operations.

// Dispatching a Reducer Function: When you dispatch a plain reducer function, Redux doesn't do anything special. It directly passes the action to the reducers. This is typically used for synchronous actions where you want to update the state immediately based on the action.

// In summary, dispatching a thunk allows you to handle asynchronous logic before dispatching regular actions, while dispatching a plain reducer function immediately updates the state based on the action without any intermediate steps.
export const sendOtp=(email,navigate) =>
{
     return async (dispatch)=>
     {
        const toastId=toast.loading("Sending OTP...");
        dispatch(setLoading(true));
        try 
        {
           const response=await apiConnector("POST",SENDOTP_API,
           {
            email,
            checkUserPresent:true
           });
           console.log("SENDOTP API RESPONSE......",response);
           console.log(response.data.success);

           if(!response.data.success)
           {
            throw new Error(response.data.message)
           }
           toast.success("OTP Sent Successfully");
           navigate("/verify-email")
        }
        catch(error)
        {
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
     }
}
export const signUp=(signUpData,otp,navigate)=>
{
    console.log(signUpData,"----",otp)
    const {  firstName,
                 lastName,
                 email,
                 password,
                 confirmPassword,
                 accountType,
                }=signUpData
     return async(dispatch)=>
     {
         const toastId=toast.loading("Signing Up...");
         dispatch(setLoading(true));
        

         try 
         {
             const response=await apiConnector("POST",SIGNUP_API,
             {
               
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp
             })

             console.log("SIGNUP API RESPONSE.....",response);

             if(!response.data.success)
             {
                throw new Error(response.data.message)
             }
             toast.success("Signup Successful");
             navigate("/login")
         }
         catch(error)
         {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
         }
         dispatch(setLoading(false));
         toast.dismiss(toastId)
     }
}
export const login=(email,password,navigate)=>
{
     return async(dispatch)=>
     {
        const toastId=toast.loading("Loading....");
        dispatch(setLoading(true))
        try 
        {
             const response=await apiConnector("POST",LOGIN_API,
             {
                email,
                password
             })
             console.log("LOGIN API RESPONSE...",response)
             if(!response.data.success)
             {
                throw new Error(response.data.message)  
             }
             toast.success("Login Successfully");
             dispatch(setToken(response.data.token))
             const userImage=response.data?.userexisted?.image?
             response.data?.userexisted?.image
             :
             `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.userexisted.firstName} ${response.data.userexisted.lastName}`;
             dispatch(setUser({...response.data.userexisted,image:userImage}))
             localStorage.setItem("user",JSON.stringify({...response.data.userexisted}));
             localStorage.setItem("token",JSON.stringify(response.data.token))
             navigate("/dashboard/my-profile")
        }
        catch(error)
        {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
     }
}
export const logout=(navigate)=>
{
    return (dispatch)=>
    {
        dispatch(setUser(null));
        dispatch(setToken(null));
        localStorage.removeItem("token");
        toast.success("Logged Out");
        navigate("/")
    }
}

export const resetpassowrdtoken=(email,navigate,setuserExisted)=>
{
   return async(dispatch)=>
   {
      const toastId=toast.loading("Sending Reset Link...");
      dispatch(setLoading(true))
      try 
      {
            const response=await apiConnector("POST",`${RESETPASSWORDTOKEN_API}`,
            {
               email
            })
            console.log("Reset password token api is working successfully",response);
            console.log(response.data.success);
            

            if(!response.data.success)
            {
               
               throw new Error(response.data.message);
               
               
            }
            else 
            {
               
               toast.success("Reset Link Delivered..")
            }
          
           
      }
      catch(error)
      {
         if(error)
         {
            setuserExisted(false)
         }
            console.log("Error while sending the reset link",error.message);

      }
      toast.dismiss(toastId);
      dispatch(setLoading(false))
   }
}

export const resetpassword=(password,confirmPassword,token,navigate)=>
{
   return async(dispatch)=>
   {
      const toastId=toast.loading("Resetting Password...")
      dispatch(setLoading(true));

      try 
      {
            const response=await apiConnector("POST",`${RESETPASSWORD_API}`,
            {
               password,
               confirmPassword,
               token
               
            })

            console.log("Password is successfully reset",response)
            console.log(response.data.success);

            if(!response.data.success)
            {
               throw new Error(response.data.message)
            }
            toast.success("Password Is Resetted");
            navigate("/login")

          

      }
      catch(error)
      {
         console.log("Error while sending the reset link",error.message);
      }
      toast.dismiss(toastId);
      dispatch(setLoading(false))
   }
}