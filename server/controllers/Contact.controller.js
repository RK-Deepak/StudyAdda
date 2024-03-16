const Contact=require("../models/Contact.models.js")

exports.contactForm=async(req,res)=>
{
    try 
    {
//get the data from user
const {firstName,lastName,email,phonenumber,message,countryCode}=req.body;

//validation 
if(!firstName || !lastName || !email || !phonenumber || !message)
{
    return res.status(403).json({
        success:false,
        message:"Some contact us field are missing"
    })
}
//check if any kind of query already created by user previousey
const useroldquery=await Contact.findOneAndUpdate({email},
    {
        countryCode,
        phonenumber,
        message,
        firstName,
        lastName

    },{new:true})
 if(!useroldquery)
 {
    const response=await Contact.create({
        countryCode,
        phonenumber,
        message,
        firstName,
        lastName,
        email
    })

    

   return res.status(200).json({
        success:true,
        message:"Contact Info created and save",
        data:response

    })
 }
 return res.status(200).json({
    success:true,
    message:"Contact Info is updatd",
    data:useroldquery
 })
    }
    catch(error)
    {
        console.log("Server Error",error.message);
        res.status(500).json({
            success:false,
            message:"Server issue"
        })
    }
    
}