const mongoose=require("mongoose");
const mailSender =require("../utils/mailSender.js")
const emailTemplate=require("../mail/templates/emailVerificationTemplate.js")

const otpSchema=new mongoose.Schema({
    email:
    {
        type:String,
        required:true,
        
    },
    otp:
    {
        type:String,
        required:true
    },
    createdAt:
    {
        type:Date,
        default:Date.now,
        expires:60 * 5
    },
    
    

})

async function sendEmailVerification(email,otp)
{
    try 
    {
        //we get a mail response here if successfully send
       const mailResponse=await mailSender(email,"Verification email from StudyAdda",emailTemplate(otp));
       console.log("Email send successfully",mailResponse)
    }
    catch(error)
    {
      console.log("Error while sending email",error);
      throw error
    }
}

//before saving data in databse we add pre middleware 
//which send email verification mail
otpSchema.pre("save",async function(next)
{
    console.log("New document saved to database");

    await sendEmailVerification(this.email,this.otp)
    next();
})

module.exports=mongoose.model("OTP",otpSchema)