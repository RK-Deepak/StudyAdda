const ReviewAndRating = require("../models/RatingAndReview.model.js");
const User = require("../models/User.model.js");
const Course = require("../models/Course.model.js");

const { default: mongoose } = require("mongoose");
require("dotenv").config();
//creae Rating
exports.createRating = async (req, res) => {
  try {
    //get courseid and userid and other details
   
    const userId = req.user.id;
console.log(req.body)
    const { courseId, rating, review } = req.body;
    console.log(courseId,rating,review)
    console.log(userId)
    //check if user who is making such request is enrolled in course
    //or not +get course details
    const courseDetails = await Course.findOne({
      _id: courseId, // Search criteria: Find a document with the specified courseId
      studentEnrolled: {
        // Look within the studentsEnrolled array
        $elemMatch: {
          // Match elements within the array that meet the following criteria
          $eq: userId, // The userId matches an element in the studentsEnrolled array
        },
      },
    });
    console.log(courseDetails)
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

    //check if user already reviewed on that course or not
    const alreadyReviewd = await ReviewAndRating.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewd) {
      return res.status(403).json({
        success: false,
        message: "Course is already reviewed by the user",
      });
    }
    //now create db entry
    const ratingreview = await ReviewAndRating.create({
      rating,
      review,
      user: userId,
      course: courseId,
    });
    //after creating review we have to out it in course

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingreview._id,
        },
      },
      { new: true }
    );
    console.log(updatedCourseDetails);
    //return response
    return res.status(200).json({
      success: true,
      message: "Rating and Review created Successfully",
      ratingreview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get averageRating
exports.averageRating = async (req, res) => {
  try {
    //get courseId
    const courseId = req.body.courseId;
    //calculate averageRating
    const result = await ReviewAndRating.aggregate([
      //             $match: This stage filters documents based on the specified criteria. In this case, it matches documents where the _id field matches the courseId provided.

      // $group: This stage groups the matched documents together.
      //  Since _id: null is specified, it groups all matched documents into a
      //   single group. Within this group, it calculates the average
      // rating using the $avg aggregation operator on the "rating" field
      // Stage 1: Match documents based on some criteria
      { $match: { _id: courseId } },
      // Stage 2: Group documents based on some criteria and calculate aggregates
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ]);
    //return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }
    //if no rating/Review exist
    return res.status(200).json({
      success: true,
      message: "Average Rating is 0, no ratings given till now",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getAllRatingAndReview
exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await ReviewAndRating.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email profileImage",
      })
      .populate({
        path: "course",
        select: "courseName",
      });
    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
