
const SubSection=require("../models/SubSection.js");
const CourseProgress=require("../models/CourseProgress.model.js");

exports.updateCourseProgress=async(req,res)=>
{
    const {courseId,subSectionId}=req.body;
    const userId=req.user.id;
console.log(userId,courseId,subSectionId);

    try 
    {
           //lets find out that section exist or not
           const subSection=await SubSection.findById(subSectionId);

           if(!subSection) {
            return res.status(404).json({error:"Invalid SUbSection"});
        }

        console.log("SubSection Validation Done");


        //if course is already completed IN PAST or not for that user

        let courseProgress=await CourseProgress.findOne({courseId:courseId,
        userId:userId});
        if(!courseProgress) {
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist"
            });
        }
        else 
        {
            if(courseProgress?.completedVideos?.includes(subSectionId))
            {
                
                return res.status(400).json({
                    
                    error:"Lecture already completed",
                    completeVideos:courseProgress
                });
            }

            courseProgress.completedVideos?.push(subSectionId);
            console.log("Copurse Progress Push Done");
        }

        await courseProgress.save();
        console.log("Course Progress Save call Done");
        return res.status(200).json({
            success:true,
            message:"Course Progress Updated Successfully",
            completedVideos:courseProgress
        })


    


    }
    catch(err)
    {
        console.error(err);
        
        return res.status(400).json({err:"Internal Server Error",
    });
    }
}