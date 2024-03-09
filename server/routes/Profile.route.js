const express=require("express");
const router=express.Router();

const {createProfile,
    updatedDisplayPicture,
    deleteAccount,
    getAllUserDetails,
    getenrolledCourses
}=require("../controllers/Profile.controller.js")

const {auth}=require("../middlewares/auth.js")
//profile routes

//create profile/update
router.put("/updateProfile",auth,createProfile);
//delete profile
router.delete("/deleteAccount",auth,deleteAccount);
//updateDisplay picture
router.put("/updateDisplayPicture",auth,updatedDisplayPicture);
//get  user details
router.get("/getUserDetails",auth,getAllUserDetails);
//get enrolled courses of user
router.get("/getEnrolledCourses",auth,getenrolledCourses);

module.exports=router