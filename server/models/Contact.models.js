const  mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const querySubmittedTemplate = require("../mail/templates/queySubmission");

const contactSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    countryCode:
    {
         type:String,
         required:true,
         default:"+91",
         trim:true

    },
    phonenumber:
    {
      type:String,
      require:true,
      trim:true
    },
    message:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
       
       
    },
   
})

async function sendingConfirmationMail(email)
{
 try 
 {
    const mailResponse=await mailSender(email,"Submission Email from StudyAdda",querySubmittedTemplate());
    console.log("hi",mailResponse);
 }
 catch(error)
 {
    console.log(error.message);
    throw error
 }
}


contactSchema.pre("save", async function (next) {
    console.log("Before saving the document");
    // Perform actions before saving, like sending confirmation email
    await sendingConfirmationMail(this.email);
    next();
});





contactSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });



module.exports=mongoose.model("Contact",contactSchema);

