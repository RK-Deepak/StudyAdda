const User=require("../models/User.model.js");
const bcrypt=require("bcrypt");
const mailSender=require("../utils/mailSender.js")
const crypto=require("crypto");
require("dotenv").config();

//resetPassword//forgot token first part
//we send reset email to user eamil

exports.resetPasswordToken=async(req,res)=>
{
    try
    {
//when we reset/forget in request we send email

const email=req.body.email;
//validate the email 
if(!email)
{
    return res.status(400).json({
        status:"false",
        message:"Email Should be Present"
    })
}
//check if user existed for this email or not
const user=await User.findOne({email});

if(!user)
{
    return res.status(400).json({
        status:"false",
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
    }) 
}
//generate token for each email its different
// const token=crypto.randomUUID() OR ;
const token=crypto.randomBytes(21).toString("hex");

//put it in db
const updatedDetails=await User.findOneAndUpdate({email},
    {
       token:token,
       resetPasswordExpires:Date.now() + 360000
    },{new:true})

    console.log("DETAILS", updatedDetails);

//generate password reset url
const url=`http://localhost:3001/update-password/${token}`


//send mail 
const mailResponse=await mailSender(email,"Password Reset Email",`Your Link for Resetting Password is ${url}. Please click this url to reset your password.`)
console.log(mailResponse)

//RETURN RESPONSE 
return res.json({
    success:true,
    message:'Email sent successfully, please check email and change pwd',
});
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        })
    }
    
}

//update the update password in db


exports.resetPassword=async (req,res)=>
{
    try 
    {
        //fetch data from frontend
        //token is here we get from url
          const {password,confirmPassword,token}=req.body

        //validate the field
        if(password!==confirmPassword)
        {
            return res.json({
                success:false,
                message:'Password not matching',
            });
        }
        const userDetails=await User.findOne({token:token})
         //if user do not exist 
         if(!userDetails)
         {
            return res.json({
                success:false,
                message:'Token is invalid',
            });
         }
         //if token expires or not
         if(!(userDetails.resetPasswordExpires > Date.now()))
         {
            return res.json({
                success:false,
                message:'Token is expired, please regenerate your token',
            });
         }
         //hash password 
         const hashedPassword=await bcrypt.hash(password,10)
    //update db
        await User.findOneAndUpdate({
            token},
            {
                password:hashedPassword
            },
            {new:true})

            return res.status(200).json({
                success:true,
                message:'Password reset successful',
            });

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        })
    }
}
