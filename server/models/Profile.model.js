const mongoose=require("mongoose");

const profileSchema=new mongoose.Schema({
    gender:
    {
        type:String,
        enum:["Male","Female","Other"]
    },
    dateOfBirth:{
        type:String
    
    },
    profession:{
        type:String,
        trim:true
    },
    contactNumber:
    {
        type:Number,
        trim:true
    },
    about:
    {
        type:String,
        trim:true
    },
  


},{timestamps:true});

module.exports=mongoose.model("Profile",profileSchema);