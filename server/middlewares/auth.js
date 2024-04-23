const jwt=require("jsonwebtoken");


require("dotenv").config();

//auth
exports.auth=async(req,res,next)=>
{
    try 
    {
        //get token from request
         const token=req.cookies.token || req.body.token || 
                    req.header("Authorisation").replace("Bearer ", "");

         //validating token aaya ya nhi
         if(!token)
         {
            return res.status(402).json({
                success:false,
                message:"No token received"
            })
         }

         //token is valid or not and put it in req
         console.log("auth",token)
         try
         {
             const decode=jwt.verify(token,process.env.JWT_SECRET)
             console.log(decode);
             req.user=decode;
         }
         catch(error)
         {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
         }
         next();
    }
    catch(error)
    {
        console.log("error");
        return res.status(500).json(
        {
            success:"false",
            message:"Something went wrong while validating token",
        })
    }
}

//isStudent
exports.isStudent=async(req,res,next)=>
{
    try 
    {
       if(req.user.accountType!=="Student")
       {
        return res.status(401).json({
            success:false,
            message:'This is a protected route for Students only',
        });
       }
       next();
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
    })
}
}
//isIntructor
exports.isInstructor=async(req,res,next)=>
{
    try 
    {
         if(req.user.accountType!=="Instructor")
         {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Instructor only',
            });
         }
         next();
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
    })
    }
}
//isAdmin

exports.isAdmin=async(req,res,next)=>
{
    try 
    {
         if(req.user.accountType!=="Admin")
         {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Admin only',
            });
         }
         next();
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
    })
    }
}
