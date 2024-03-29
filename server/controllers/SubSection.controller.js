const Section=require("../models/Section.model.js");
const SubSection=require("../models/SubSection.js");
const Course=require("../models/Course.model.js")
const {imageUplaodOnCloud}=require("../utils/imageUploader.js")
require("dotenv").config();
exports.createSubSection=async(req,res)=>
{
     try 
     {
          //get data 
          const {title,description,sectionId,duration,courseId}=req.body;

          //get video from files
          const video=req.files && req?.files?.videoURL;
         console.log("all info",title,description,sectionId,video)
          //validtion of data
          if(!sectionId || !title  || !description || !video || !courseId) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        } 

        //upload videotocloudinary
        const videoUpdateDetails=await imageUplaodOnCloud(video,process.env.FOLDER_NAME);
       console.log(videoUpdateDetails)
        //create entry in db 
        const subSectionDetails=await SubSection.create({
            title,
            description,
            duration:`${videoUpdateDetails.duration}`,
            videoURL:videoUpdateDetails?.secure_url
        })
        //update this subsection in section
        console.log("")

        const updatedSection=await Section.findByIdAndUpdate(sectionId,
            {
                $push:{subSection:subSectionDetails._id}},
                {new:true}
            ).populate("subSection").exec();

            const updatedCourse=await Course.findByIdAndUpdate(courseId)
            .populate({
              path:"instructor",
              populate:{
                path:"additionalData"
              }
            }).populate("category")
            .populate({
              path:"courseContent",
              populate:{
                path:"subSection"
              }
            }).exec()

            if (!updatedCourse) {
              return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`,
              });
            }
        

            return res.status(200).json({
                success:true,
                message:'Sub Section Created Successfully',
                data:updatedCourse,
            });
        cons
     }
     catch(error)
     {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
     }
}

//update subSection
exports.updateSubSection=async(req,res)=>
{
    try
    {
       //get subsectionid
       const {subSectionId,title,description}=req.body;
       //validate
       if(!subSectionId)
      {
        return res.status(400).json({
        success:false,
        message:"Need SubSectionId"
       })
     }
     //find such subsection exxist or not
      const subSectionexisted=await SubSection.findById(subSectionId);
      if(!subSectionexisted)
      {
        return res.status(400).json({
            success:false,
            message:"No Such Subsection",
            error:error.message,
        })
      }
    //checking for title
      if (title !== undefined) {
        subSectionexisted.title = title
      }
      //checkign for description
      if (description !== undefined) {
        subSectionexisted.description = description
      }
      //checking for videoFile
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        //upload on cloudinary
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSectionexisted.videoURL = uploadDetails.secure_url
        subSectionexisted.duration = `${uploadDetails.duration}`
      }
    const response=await subSectionexisted.save();

        return res.status(200).json({
            success:true,
            message:'SubSection Updated Successfully',
            data:response
        });

    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"Unable to update SubSection, please try again",
            error:error.message,
        })
    }
    
}

//delete subSection

exports.deletesubSection=async(req,res)=>
{
    try 
    {
    //we want to delete so first we have to delete it from Section as well
    // as subSection
      const {subSectionId,sectionId,courseId}=req.body;

      await Section.findByIdAndUpdate(sectionId,{
        $pull:{
              subSection:subSectionId
        }
      });

      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      
      const updatedCourse=await Course.findByIdAndUpdate(courseId)
      .populate({
        path:"instructor",
        populate:{
          path:"additionalData"
        }
      }).populate("category")
      .populate({
        path:"courseContent",
        populate:{
          path:"subSection"
        }
      }).exec()
      

      if (!updatedCourse) {
        return res.status(400).json({
          success: false,
          message: `Could not find the course with ${courseId}`,
        });
      }
      console.log(updatedCourse);

      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
      return res.status(200).json({
        success:true,
        message:"SubSection Deleted Successfully",
        data:updatedCourse
    })

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete Sub Section, please try again",
            error:error.message,
        });
    }
}