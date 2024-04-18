const express=require("express");

const router=express.Router();

const 
{getAllCourse,
    getCourseDetails,
    createCourse,editCourse,getCoursesOfInstructor,deleteCourse
}=require("../controllers/Course.controller.js");

const {createSection,
    updateSection
,deleteSection}=require("../controllers/Section.controller.js");

const {createSubSection,
    deletesubSection,
    updateSubSection}=require("../controllers/SubSection.controller.js");

const {createCategory,getAllCategories,
categoryPageDetails}=require("../controllers/Category.controller.js");

const {createRating,
averageRating,getAllRating}=require("../controllers/RatingAndReview.js")

const {auth,isStudent,
    isInstructor,isAdmin}=require("../middlewares/auth.js");

const {updateCourseProgress}=require("../controllers/CourseProgress.js");



//course routes
router.post("/createCourse",auth,isInstructor,createCourse);
router.post("/editCourse",auth,isInstructor,editCourse)
router.post("/createSection",auth,isInstructor,createSection);
router.post("/createSubSection",auth,isInstructor,createSubSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
router.post("/deleteSubSection",auth,isInstructor,deletesubSection);
router.post("/deleteCourse",auth,isInstructor,deleteCourse)
router.post("/getInstructorCourses",auth,isInstructor,getCoursesOfInstructor)
router.post("/getCourseDetails",getCourseDetails)
router.get("/getAllCourses",getAllCourse);
router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress)


//category routes

router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/getAllCategories",getAllCategories);
router.post("/categoryPageDetails",categoryPageDetails);

//review And Rating
router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",averageRating);
router.get("/getReviews",getAllRating)



module.exports=router;