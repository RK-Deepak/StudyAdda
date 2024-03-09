const OTP=require("../models/Otp.model.js");
const User = require("../models/User.model.js");
const mailSender=require("../utils/mailSender.js")
const otpGenerator =require("otp-generator")
const bcrypt=require("bcrypt");
const Profile = require("../models/Profile.model.js");
const {passwordUpdated}=require("../mail/templates/passwordUpdate.js")
const jwt=require("jsonwebtoken")
require("dotenv").config();


//send otp
exports.sendOTP=async(req,res)=>
{
   try
    {
  //get email from body
  const {email}=req.body;
  console.log(email)
  
  //email validation
  if(!email)
  {
      return res.status(400).json({
          success:false,
          message:"Email field should not be empty"

      })
  }
  //check if user already existed or not
  const checkExistedUser=await User.findOne({email:email});

  if(checkExistedUser)
  {
    return res.status(402).json({
        success:false,
        message:"User already registered"


    })
  }
//genreate otp
var otp= otpGenerator.generate(6,{
   digits:true,
   lowerCaseAlphabets:false,
   upperCaseAlphabets:false,
   specialChars:false

})
console.log(otp)
//check if otp is uniqure or not
let result=await OTP.findOne({otp:otp})
while(result)
{
     otp= otpGenerator.generate(6,{
        digits:true,
        lowerCaseAlphabets:false,
        upperCaseAlphabets:false,
        specialChars:false
     
     })
     result=await OTP.findOne({otp:otp})
}
//store it in db 
const generatedOtp=await OTP.create({email,otp});
console.log("this is",generatedOtp)



//proceed further and send success status

res.status(200).json({
    status:"true",
    message:"OTP send successfully",
    otp

})
    }
    catch(error)
    {
        console.log("Issue while sending otp",error)
        res.status(500).json({
            status:"false",
            message:"fail to  send otp",
            data:error.message
        
        })
    }
  
}

//signUp
exports.signUp=async(req,res)=>
{
    //fetch data from req body
    try 
    {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            contactNumber,
            accountType,
           otp
        }=req.body
        //validation 
        if(!firstName || !lastName || !email || !password ||
            !confirmPassword || !otp)
            {
                return res.status(403).json({
                    success:false,
                    message:"All fields are required"
    
                })
            }
        //if password and confirm password does not match
         if(password!==confirmPassword)
         {
            return res.status(403).json({
                success:false,
                message:"Password and confirm password does not match"
    
            })
         }
         //if user already existed
         const existedUser=await User.findOne({email});
           console.log(existedUser);
         if(existedUser)
         {
            return res.status(403).json({
                success:false,
                message:"User existed with same email id"
    
            }) 
         }
         //find most recent otp for user 
         //find return an array
         const recentOTP=await OTP.find({email}).sort({createdAt:-1}).limit(1);
         console.log(recentOTP);

         //validation of otp
         if(recentOTP.length===0)
         {
            //otp not found 
            return res.status(400).json({
                success:false,
                message:"OTP is not valid"
    
            }) 

         }
         else if(otp!==recentOTP[0].otp)
         {
            return res.status(400).json({
                success:false,
                message:"OTP does not match"
    
            }) 
         }
        console.log("iddhar gadbad hai")
         //if otp matches time to hash password

         const hashpassword=await bcrypt.hash(password,10);
         console.log(hashpassword);

        

         //genetate data in db 

         //we also create Profile becuase we need additional data
         const profileData=await Profile.create({
            gender:null,
            dateOfBirth:null,
            profession:null,
            phoneNo:null,
            about:null,

         })
         const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashpassword,
            additionalData:profileData._id,
            contactNumber,
            profileImage:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            accountType,
           
         })

         //RESPONSE 
         return res.status(200).json({
            success:true,
            message:'User is registered successfully',
            user,
        });


    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'User can not registered',
        
        });
    }
  
}

//login

exports.login=async(req,res)=>
{
    try 
    {
       //get data from frontend
       const {email,password}=req.body
       //validate the fileds
       if(!email || !password)
       {
        return res.status(400).json({
            message:"Email or Password is empty"
        })
       }
       //check if user existed or not of that email
       const userexisted=await User.findOne({email}).populate("additionalData").exec();

       if(!userexisted)
       {
        return res.status(400).json({
            success:"false",
            message:"No such user is registered"
        })
       }
       //compare the password and jwt TOKEN generation
       if(await bcrypt.compare(password,userexisted.password))
       {
        const payload=
        {
           email:userexisted.email,
           id:userexisted._id,
           accountType:userexisted.accountType

        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
         userexisted.token=token,
         userexisted.password=undefined

         //now create cookie and send it to client
         let options={
            httpOnly:true,
            expires:new Date(Date.now()+ 3*24*60*60*10000)
         }
         res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            userexisted,
            message:"Logged in successfully"
         })


       }
       else 
       {
        res.status(403).json({
            status:false,
            message:"Password is incorrect"
        })
       }

    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({
            status:false,
            message:"Some server issue is going on"
        })
    }
}

//changePassword
exports.changePassword=async(req,res)=>
{
    try 
    {
//get data from body 
const {oldPassword,newPassword,confirmNewPassword}=req.body

//validation 
if(!oldPassword || !newPassword || !confirmNewPassword || !email)
{
    return res.status(402).json({
        status:"false",
        message:"Some field are empty"

    })
}
//check old passowrd and entered password is same or not 
const existedUser=await User.findById(req.user.id);

const isPasswordMatch = await bcrypt.compare(
    oldPassword,
    existedUser.password
);
if (!isPasswordMatch) {
    // If old password does not match, return a 401 (Unauthorized) error
    return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
}



 if(newPassword!==confirmNewPassword)
{
    return res.status(403).json({
        status:"false",
        message:"Password and ConfrimPassword does not match"
    })
}

//update the password in db
const encryptedPassword = await bcrypt.hash(newPassword, 10);
const updatedUserDetails = await User.findByIdAndUpdate(
    req.user.id,
    { password: encryptedPassword },
    { new: true }
);

// Send notification email
try {
    const emailResponse = await mailSender(
        updatedUserDetails.email,
        passwordUpdated(
            updatedUserDetails.email,
            `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
    );
    console.log("Email sent successfully:", emailResponse.response);
} catch (error) {
    // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while sending email:", error);
    return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
    });
}

// Return success response
return res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
} catch (error) {
// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
console.error("Error occurred while updating password:", error);
return res.status(500).json({
    success: false,
    message: "Error occurred while updating password",
    error: error.message,
});
}
}