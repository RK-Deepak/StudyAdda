const User = require("../models/User.model.js");
const Category = require("../models/Category.model.js");
const Course = require("../models/Course.model.js");
const CourseProgress=require("../models/CourseProgress.model.js")

const {imageUplaodOnCloud} = require("../utils/imageUploader.js");
const { convertSecondsToDuration } = require("../utils/secToDuration.js");
require("dotenv").config();
exports.createCourse = async (req, res) => {
  try {
    //get data about course
    let {
      courseName,
      courseDescription,
      price,
      whatYouwillLearn,
      language,
      category,
      tag:_tag,
      status,
      instructions:_instructions,
    } = req.body;





    //get thumbnail

    const thumbnail = req?.files?.thumbnail;

       // Convert the tag and instructions from stringified Array to Array
    const tag=JSON.parse(_tag);
    const instructions=JSON.parse(_instructions)

console.log("tags",tag);

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouwillLearn ||
      !price ||
      !category ||
      !thumbnail ||
      !language ||
      !tag.length ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (!status || status === undefined) {
      status = "Draft";
    }
    
    //get the instructor
    //if instructor is logged in and creatin course so in req
    //we already passed the token req.user=decode from which i can
    //get user id
    const userId = req.user.id;
    console.log("user id",userId);

    //convert the tag and instructions from string to array 
  
    const InstructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });
    console.log(InstructorDetails);

    if (!InstructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }
    //check if the category which we got is valid or not
    //here category is id not name because in courses model we know we put category id
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag Details not found",
      });
    }
    //upload image on clodinary
    const thumbnailImage = await imageUplaodOnCloud(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create entry of course in databse
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      price,
      whatYouwillLearn,
      language,
      tag,
      category: categoryDetails._id,
      instructor: InstructorDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: instructions,
    });
    console.log(newCourse);

    //add the new couse in instructor(which is user) course list
    await User.findByIdAndUpdate(
      { _id: InstructorDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    //add that course in tag also

    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },

      { $push: { courses: newCourse._id } },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create Course",
      error: error.message,
    });
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
       
       
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot Fetch course data",
      error: error.message,
    });
  }
};
//get courseDetails
exports.getCourseDetails = async (req, res) => {
  console.log("hiiiiiiiiiiii")
  try {
    //get coursid
    console.log("hiiiiiiiiiiii")
    const  {courseId}  = req.body;
    const userId = req?.user?.id
    //find course details
    console.log("this is ide",courseId)
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalData",
        },
      })
      .populate("category")
     .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

      let courseProgressCount=await  CourseProgress.find({
        courseId:courseId,
        userId:userId
        
      })

      console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }

    let totalDurationInSeconds=0
    courseDetails.courseContent.forEach((content)=>
    {
      content.subSection.forEach((subSection)=>
      {
        const timeDurationInSeconds=parseInt(subSection.duration);
        totalDurationInSeconds+=timeDurationInSeconds
      })
    })
    const totalDuration=convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data:{
        courseDetails,
        totalDuration,
        completedVideos:courseProgressCount?.completedVideos
        ?courseProgressCount?.completedVideos
        :[],
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//edit course 
exports.editCourse=async(req,res)=>
{
  try 
  {
 //get values
   const {courseId}=req.body;
   //in this we have all updated fiedl
   const updates=req.body;
  

   const course=await Course.findById(courseId);
   console.log("updates",courseId,updates);

   if(!course)
   {
    return res.status(404).json({ error: "Course not found" })
   }
   
   //if image is updated
   if(req.files)
   {
    const thumbnail=req.files.thumbnail;
    const thumbnailImage=await imageUplaodOnCloud(thumbnail,
      process.env.FOLDER_NAME)
      course.thumbnail=thumbnailImage.secure_url
   }

     
   //update only the filed which is present IN REQ BODY 
   for(let key in updates)
   {
        if(updates.hasOwnProperty(key))
        {
          if(key==="tag" || key==="instructions")
          {
            course[key]=JSON.parse(updates[key]);
          }
          else 
          {
            course[key]=updates[key]
          }
        }
   }


  //get user id
  const userId=req.user.id;


  //check if such user exist or not and also such its insturctor type exist or not of that id
  const userExist=await User.findById(userId,{
    accountType:"Instructor"
  });
  //if user does not exist or its not instructor
  if(!userExist)
  {
      return res.status(400).json({
        success:false,
        message:"No Such User Existed or User is not Instructor"
      })
  }

  await course.save()
  const updatedCourseInfo = await Course.findOne({
    _id:courseId,
  }) .populate({
    path: "instructor",
    populate: {
      path: "additionalData",
    },
  })
  .populate("category")
  .populate("ratingAndReviews")
  .populate({
    path: "courseContent",
    populate: {
      path: "subSection",
    },
  })
  .exec()
    
      res.status(200).json({
        success: true,
        data: updatedCourseInfo,
        message: "Course Updated Successfully",
      });

  }
  catch (error) {
		// Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to update course",
			error: error.message,
		});
	}
  
 

  }

exports.getCoursesOfInstructor = async (req, res) => {
try 
{
 const {instructorId}=req.body;
    console.log("reached")

    //if instructor id present of not
    const instructorDetails=await User.findById({_id:instructorId},
      {accountType:"Instructor"}
      );

      console.log(instructorDetails)

      if(!instructorDetails)
      {
        return res.status(400).json({
          success:false,
          message:"No Such Instructor Exist"
        })
      }

   
      const allCourses=await Course.find({instructor:instructorId})
      .select('courseName price thumbnail category  language status courseDescription createdAt').populate("instructor").
      populate("category")
      .exec();
  
      return res.status(200).json({
        success: true,
        message: "Data for all courses fetched successfully",
        data: allCourses,
      });
    }
     catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Cannot Fetch course data",
        error: error.message,
      });
    }
  };

exports.deleteCourse=async(req,res)=>
  {
    try {
    //GET THE DATA
        const {courseId,instructorId,categoryId}=req.body;
        console.log(courseId,instructorId,categoryId);

        //VALIDATE THE DATA
        if(!courseId || !instructorId)
        {
          return res.status(400).json({
            success:false,
            message:"CourseId or InstructorID not send"
          })
        }
        //check if such instuctor is present and it has courseId in its list
        const instructorDetails=await User.findById(instructorId);

        if(!instructorDetails)
        {
          return res.status(401).json({
            success:false,
            message:"No Such Instructor Exist"
          })
        }

        //first delete that course from category and 

        const updatedCategory=await Category.findByIdAndUpdate({_id:categoryId},{
          $pull:{courses:courseId}
        });

        //also need that course from student profile who bought it
        

        //second thing delete that course from courses list of array
          const response=await Course.findByIdAndDelete(courseId);
            if(!response)
            {
              return res.status(401).json({
                success:false,
                message:"No Such Course Exist"
              })
            }

            res.status(200).json({
               success:true,
               message:"Course Deleted Successfully"

            })
      }
      catch(error)
      {
           console.log("Some issue in course deletion",error)
      }
  }




      
  
