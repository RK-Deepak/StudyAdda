const Category=require("../models/Category.model.js");
require("dotenv").config();
exports.createCategory=async (req,res)=>
{
    try 
    {
 //get data from req
 const {name,description}=req.body
 //validation of data
 if(!name || !description)
 {
     return res.status(402).json({
         success:false,
         message:'All fields are required',
     })
 }
 //create db entry for tag
 const categoryDetails=await Category.create({
     name,description
 })
 console.log(categoryDetails);

 //response 
 res.status(200).json({
     success:true,
     message:"Category Created Successfully",
 })
}
catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message,
    })
}
    }

exports.getAllCategories=async(req,res)=>
{
   try 
   {
       const allTags=await Category.find({},{description:true,name:true});
       console.log(allTags);

       res.status(200).json({
        success:true,
        message:"Got all categories",
        allTags
       })
   }
   catch(error)
   {
    return res.status(500).json({
        success:false,
        message:error.message,
    })
   }
}
exports.categoryPageDetails=async(req,res)=>
{
    try 
    {
       const {categoryId}=req.body;

       //get courses for the specified category 
       const selectedCategory = await Category.findById(categoryId)
			.populate("courses")
			.exec();
            console.log(selectedCategory);
            
      //if no such category exist
      if (!selectedCategory) {
        console.log("Category not found.");
        return res
            .status(404)
            .json({ success: false, message: "Category not found" });
    }
    //if not courses in that catefory 
    if(selectedCategory.courses.length===0)
    {
        console.log("No courses found for the selected category.");
        return res.status(404).json({
            success: false,
            message: "No courses found for the selected category.",
        });
    }
      
    const selectedCourses=selectedCategory.courses;

    //get all the categories which is not related to this category 
    const categoriesExceptSelected=await Category.findById({
        _id:{$ne:categoryId}
    }).populate("courses").exec();

    //get all courses not related to selectedcategory
    let differentcourses=[];
      for(const category of categoriesExceptSelected)
      {
        differentcourses.push(...category.courses);
      }
        
    const allCategories = await Category.find({}).populate("courses");
    //get all coursces 
    //const allCategories = [
//   { name: 'Math', courses: ['Algebra', 'Calculus', 'Geometry'] },
//   { name: 'Science', courses: ['Physics', 'Chemistry', 'Biology'] },
//   { name: 'History', courses: ['World History', 'US History', 'Ancient Civilizations'] }
// ];
//we will get
//[  'Algebra', 'Calculus', 'Geometry',  'Physics', 'Chemistry', 'Biology',  'World History', 'US History', 'Ancient Civilizations']

    const allCourses=allCategories.flatMap((category)=>category.courses);
    //most selling courses
    const mostSellingCourses=allCourses.sort((a,b)=>b.sold-a.sold).slice(0,10);

    res.status(200).json({
        selectedCourses: selectedCourses,
        differentCourses: differentcourses,
        mostSellingCourses: mostSellingCourses,
    });

    }
 

    catch(error)
    {
        return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}
   

