const User = require("../models/User.model.js");
const Category = require("../models/Category.model.js");
const Course = require("../models/Course.model.js");
const {imageUplaodOnCloud} = require("../utils/imageUploader.js");
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
      tag,
      status,
      instructions,
    } = req.body;

    console.log(courseName,courseDescription,price,whatYouwillLearn,language,category,tag,status,instructions)



    //get thumbnail

    const thumbnail = req.files.thumbnail;

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouwillLearn ||
      !price ||
      !category ||
      !thumbnail ||
      !language ||
      !tag
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (!status || status === undefined) {
      status = "Draft";
    }
    //
    //get the instructor
    //if instructor is logged in and creatin course so in req
    //we already passed the token req.user=decode from which i can
    //get user id
    const userId = req.user.id;
    console.log("user id",userId);
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
        ratingAndReviews: true,
        studentsEnroled: true,
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
  try {
    //get coursid
    const { courseId } = req.body;
    //find course details
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalData",
        },
      })
      .populate("category")
     // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data: courseDetails,
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
 const { 
  courseName,
  courseDescription,
  price,
  whatYouwillLearn,
  categoryId,
  language, 
  instructions,
  tag,
  courseId
}=req.body

  //get image
  const thumbnail=req.files?req.files?.thumbnail:null;

  //get user id
  const userId=req.user.id;
  console.log("course data",courseName,courseDescription,price,whatYouwillLearn,categoryId,language,instructions,tag,courseId)

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

  //check if such course exist or not 
  const courseExisted=await Course.findById(courseId);
  if(!courseExisted)
  {
    return res.status(400).json({
      success:false,
      message:"No Such Course Existed"
    })
  }

  // Check if the category given is valid
  const categoryDetails = await Category.findById(categoryId);
  if (!categoryDetails) {
    return res.status(404).json({
      success: false,
      message: "Category Details Not Found",
    });
  }
  let thumbnailImage;
  if(thumbnail)
  {
    thumbnailImage=await imageUplaodOnCloud(thumbnail,
      process.env.FOLDER_NAME)
  }

    
    
  const updateFields = {};
  if (courseName) updateFields.courseName = courseName;
  if (courseDescription) updateFields.courseDescription = courseDescription;
  if (price) updateFields.price = price;
  if (whatYouwillLearn) updateFields.whatYouwillLearn = whatYouwillLearn;
  if (categoryId) updateFields.category = categoryId;
  if (thumbnailImage) updateFields.thumbnail = thumbnailImage.secure_url;
  if (language) updateFields.language = language;
  if (instructions) updateFields.instructions = instructions;
  if (tag) updateFields.tag = tag;

  const updatedCourseInfo = await Course.findByIdAndUpdate(courseId, updateFields, {
    new: true
  });

      if(categoryId!=="")
      {
        await Category.findByIdAndUpdate(
          { _id: categoryId },
          {
            $push: {
              courses: updatedCourseInfo._id,
            },
          },
          { new: true }
        );
      }
    
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


      
  
