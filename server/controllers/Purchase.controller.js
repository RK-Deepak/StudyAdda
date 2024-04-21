const Purchase=require("../models/Purchase.model.js");
const User=require("../models/User.model.js");

exports.PurchaseDetails=async(req,res)=>
{
    try 
    {
//get required data 
const userId=req.user.id;
//validation

const user=await User.findById(userId);

if(!user)
{
    return res.status(403).json({
        success:false,
        message:"UserId required",
    })
}
console.log("reached here");
//find the user

//find the course

//find the purchase
const purchase=await Purchase.find({user:userId}).populate("courses").exec();
console.log(purchase);
if(!purchase)
{
    return res.status(403).json({
        success:false,
        message:"No purchase found"
    })
}

return res.status(200).json({
       success:true,
       message:"Purchase Details",
       data:purchase
})
    }
    catch(err)
    {
        console.log("Error: " + err);
        return res.status(500).json({
            success:false,
            message:"Some server issue is going on"
        })
    }
      
      

}