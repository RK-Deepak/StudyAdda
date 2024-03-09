const User=require("../models/User.model.js");
const Profile=require("../models/Profile.model.js");
const { imageUplaodOnCloud } = require("../utils/imageUploader.js");
require("dotenv").config();
exports.createProfile=async(req,res)=>
{
    try 
    {
//get data
const {gender,dateOfBirth=""
,profession="",
contactNumber,
about=""}=req.body;

//get user id becuase additionalDETAILS IS present in user
const id=req.user.id;



//validate the data

if(!contactNumber || !gender || !id || !dateOfBirth ) {
    return res.status(400).json({
        success:false,
        message:'All fields are required',
    });
} 
//as we know while creating user we already createdprofile so
//we only need to update it
const userDetails=await User.findById(id);
//additonal data is profile id
const profileId=userDetails.additionalData
//find profileDetails
const profileDetails=await Profile.findById(profileId)
//updating the detail
profileDetails.gender=gender;
profileDetails.about=about;
profileDetails.profession=profession;
profileDetails.dateOfBirth=dateOfBirth;
profileDetails.contactNumber=contactNumber;

//save in db
// profileDetails is the document fetched from the database using Profile.findById(profileId).
// You modify the properties of profileDetails with the updated data.
// You save the modified profileDetails back to the database with await profileDetails.save().
// Finally, you return a success response with the updated profileDetails
await profileDetails.save();
//return response
return res.status(200).json({
    success:true,
    message:'Profile Updated Successfully',
    profileDetails,
});
    }
    

    catch(error) {
        return res.status(500).json({
            success:false,
            error:error.message,
        });
    }


}
//deleteAccount
exports.deleteAccount=async(req,res)=>
{
    try 
    {
 //get data
 const id=req.user.id;
 //check if user even exist or not
 const userDetails=await User.findById(id);

 if(!userDetails) {
     return res.status(404).json({
         success:false,
         message:'User not found',
     });
 } 
 //delete profile first and after that user
 await Profile.findByIdAndDelete({_id:userDetails.additionalData});
// same as above await Profile.findByIdAndDelete(userDetails.additionalData);
 await User.findByIdAndDelete({_id:id});

 return res.status(200).json({
     success:true,
     message:'User Deleted Successfully',
 })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'User cannot be deleted successfully',
        });
    }
   



}

//getAllUserDetails
exports.getAllUserDetails = async (req, res) => {

    try {
        //get id
        const id = req.user.id;

        //validation and get user details
        // User.findById(id). You do not need to specify _id:id explicitly because Mongoose assumes that 
        // you're referring to the _id field by default
        const userDetails = await User.findById(id)
        .populate("additionalData").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:'User Data Fetched Successfully',
            data:userDetails
        });
       
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
exports.updatedDisplayPicture=async (req,res)=>
{
    try 
    {
        //get new profile pic
          const displayPicture=req.files.displayPicture;
          //get user id
          const userId=req.user.id;
          console.log(userId)
          //upload on clouinary
          const image=await imageUplaodOnCloud(displayPicture,
            process.env.FOLDER_NAME,
            1000,1000);
          console.log(image);
          //save that in db 
          const updatedProfile=await User.findByIdAndUpdate(
            {_id:userId},
            {profileImage:image.secure_url},
            {new:true}
          )
          console.log(updatedProfile)
          res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
          })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
        }
    
}

exports.getenrolledCourses=async(req,res)=>
{
    try 
    {
        //get user id
        const userId=req.user.id;
        //get user details with enrolled courses
        const userDetails=await User.findOne({
            _id:userId
        })
        .populate("courses").exec()
        if (!userDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find user with id: ${userDetails}`,
            })
          }
          return res.status(200).json({
            success: true,
            data: userDetails.courses,
          })
    }
    catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
      }
}