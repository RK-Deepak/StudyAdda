//videos of each section
const mongoose=require("mongoose");

const subSectionSchema=new mongoose.Schema({
    title:
    {
        type:String,
       
        trim:true
    },
    duration:
    {
        type:String,
    },
    description:
    {
        type:String,
      
        trim:true,

    },
    videoURL:
    {
        type:String, //which we get from cloudinary
      
    },
   
},{timestamps:true});

module.exports=mongoose.model("SubSection",subSectionSchema)