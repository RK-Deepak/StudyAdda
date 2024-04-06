const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({
    courseName:
    {
        type:String,
        required:true,
        trim:true
    },
    courseDescription:
    {
        type:String,
        required:true,
        trim:true
    },
    price:
    {
        type:Number,
        required:true,
        trim:true,

    },
    instructor:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    ratingAndReviews:
    [
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"ReviewAndRating"
    }],
    whatYouwillLearn:
    {
        type:String,
        required:true,
        trim:true
    },
    // section of videos ,course content
    courseContent:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
            required:true
        }
       
    ],
    thumbnail:
    {
        type:String, //which we get from cloudinary
        required:true,
    },
    category:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
        
    },
    tag:
    {
        type:[String],
     
    },
    studentEnrolled:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
    ],
    language:
    {
        type:String,
        trim:true
    },
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},






},{timestamps:true});

module.exports=mongoose.model("Course",courseSchema)