const Section = require("../models/Section.model.js");
const Course = require("../models/Course.model.js");
const User=require("../models/User.model.js")
// CREATE a new section
exports.createSection = async (req, res) => {
	try {
		// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;
		const userId=req.user.id;

		// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

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

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName:sectionName },
			{ new: true }
		)
		res.status(200).json({
			success: true,
			message: "Updated",
			data:section
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {
		
		const { sectionId,courseId } = req.body;
		await Section.findByIdAndDelete(sectionId);
		const updatedData = await Course.findByIdAndUpdate(
			courseId,
			{ $pull: { courseContent: sectionId } },
			{ new: true }
		  ).populate("courseContent");
        console.log(updatedData)
		res.status(200).json({
			success: true,
			message: "Section deleted",
			data:updatedData
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};