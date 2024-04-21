import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import imagelogo from "../../assets/Logo/studyadda-favicon-color.png"
import {setPaymentloading} from "../../store/Slices/courseSlice.js"
import { studentCourseBuyEndpoints } from "../apis.js";
import { resetCart } from "../../store/Slices/cartSlice.js";

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API,GET_PURCHASE_DETAILS_API}=studentCourseBuyEndpoints

//first of all as mention we have to load the razorpayScript

function loadinScript(src)
{
     return new Promise((resolve)=>
     {
        const script=document.createElement("script");
        script.src=src;

        script.onload=()=>
        {
            resolve(true)
        }
        script.onerror=()=>
        {
            resolve(false)
        }
        document.body.appendChild(script)
     })
}
let checkedValue=false;
export async function buyCourse(token,courses,userDetails,navigate,dispatch,actualCost,checkedcoins)
{
    const toastId=toast.loading("Loading...");
    checkedValue=checkedcoins;
    console.log("im buying with coins",checkedValue);
    try 
    {
          const res=await loadinScript("https://checkout.razorpay.com/v1/checkout.js");

          if(!res)
          {
            toast.error("RazorPay SDK failed to load");
            return;
          }

          //validaign the order and create the order
          const orderResponse=await apiConnector("POST",COURSE_PAYMENT_API,{courses,actualCost},{
            Authorisation:`Bearer ${token}`
          })

          if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("PRINTING orderResponse", orderResponse);

        const options={
            key:process.env.RAZORPAY_KEY,
            currency:orderResponse.data.data.currency,
            amount:orderResponse.data.data.amount,
            order_id:orderResponse.data.data.id,
            name:"StudyAdda",
            description:"Thanks To Join Journey With Us",
            image:imagelogo,
            prefill:
            {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            //after successfull payment these fn will run //RESPOMSE WHAT WE WILL GET AFTER PAYMENT WHEN DIALOG FINISH
            handler:function(response)
            {
                console.log(response);
                //send successful wala email
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token);
                //verify payment
                verifyPayment({...response,courses,checkedValue},token,navigate,dispatch)

                
            }

        }
        //opening razor pay window
        const paymentObject=new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment failed",function(response)
        {
            toast.error("Oops, payment failed");
            console.log(response.error); 
        })
    }
    catch(error)
    {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}


async function sendPaymentSuccessEmail(response,amount,token)
{
    try 
    {
         await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,
        {
             orderId:response.razorpay_order_id,
             paymentId:response.razorpay_payment_id,
             amount
        },
        {
            
                Authorisation: `Bearer ${token}`
            
        
        }

         )
    }
    catch(error)
    {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}
async function verifyPayment(bodyData,token,navigate,dispatch)
{
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentloading(true));
    try 
    {
        const response=await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorisation:`Bearer ${token}`,
        })
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful, You are Subscribed to this course");
        navigate("/dashboard/enrolled-courses");
        
        dispatch(resetCart())
        
    }
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentloading(false));
    
    
}

export async function purchaseDetails(token)
{
   let result=null;
   const toastId=toast.loading("Loading...");

    try 
    {
              const purchaseDetails = await apiConnector("GET",GET_PURCHASE_DETAILS_API,null,{
                Authorisation:`Bearer ${token}`
              })

              console.log("Purchase Details API response",purchaseDetails)

              if(!purchaseDetails?.data?.success) {
                throw new Error(purchaseDetails.data.message);


            }
            toast.dismiss(toastId);
result=purchaseDetails?.data?.data;
            return result;
            
    }
    catch(error) {
           
        console.log("PURCHASE DETAILS ERROR....", error);
        toast.error("Could not get Purchase Details");
    }
}