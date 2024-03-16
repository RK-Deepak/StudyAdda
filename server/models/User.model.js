const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please enter firstName"],
        trim:true
    },
    lastName:{

        type:String,
        required:[true,"Please enter lastName"],
        trim:true
    },
    email:
    {
        type:String,
        required:[true,"Please enter email"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
        trim:true,
       

    
    },
    contactNumber:
    {
        type:Number,
        trim:true
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },

    accountType:
    {
        type:String,
        enum:["Student","Instructor","Admin"],
        required:true,
        
    },
    profileImage:
    {
        
        type:String,
        required:true //we will store image cloudinary url
        
    },
    additionalData:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true
    },
    token:
    {
    type:String //its not jwt token its password reset

    },
    resetPasswordExpires:
    {
       type:Date,
    },

    courses: [
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    courseProgess:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }
    ]

},{timestamps:true});


module.exports=mongoose.model("User",userSchema);