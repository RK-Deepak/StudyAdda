const User=require("../models/User.model.js");
const Course=require("../models/Course.model.js");
const {instance}=require("../config/razorpay.js");
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail.js")
const mailSender=require("../utils/mailSender");
const {ObjectId, default: mongoose}=require("mongoose");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail.js");
require("dotenv").config();
const crypto = require("crypto");

//capture the payment and create RazorPay Order
exports.capturePayment=async(req,res)=>
{
    //which all courses we buyed 
    const {courses}=req.body;
    //we need userId from which buyed the course
    const userId=req.user.id;

    if(courses.length===0)
    {
        return res.status(400).json({success:false,message:"Please provide Courses "});

    }

    //let calcaulte total amount of all courses which we buy

    let totalAmount=0;
    for(const course_id of courses)
    {
        let course;
        try 
        {
           //for each id we get course details
           course=await Course.findById(course_id);
           if(!course)
           {
            return res.status(200).json({success:false, message:"Could not find the course"});
           }

           //convert the id in string to objectId
           const uid=new mongoose.Types.ObjectId(userId);
            //to check if student is already enrolled or not
          if(course.studentEnrolled.includes(uid))
          {
            return res.status(200).json({success:false, message:"Student is already Enrolled"});
          }
         
          totalAmount+=course.price
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

    //now lets create the order for that we need options
    const currency="INR"
    const options={
        amount:totalAmount*100,
        currency,
        receipt:Math.random(Date.now()).toString()
    }

    try 
    {
         const paymentResponse=await instance.orders.create(options);
        return res.json({
            success:true,
            message:"Payment Success",
            data:paymentResponse
        })
    }

    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }


}
//verify the payment
exports.verifyPayment=async(req,res)=>
{
    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payment_id=req.body?.razorpay_payment_id;
    const razorpay_signature=req.body?.razorpay_signature;
    const courses=req.body.courses;
    const userId=req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses ||!userId)
    {
        return res.status(200).json({success:false, message:"Payment Failed"});
    }

    //comparing sifnature before that converting it
    let body=razorpay_order_id + "|" +razorpay_payment_id;
    const expectedSignature=crypto
    .createHmac("sha256",process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

    if(expectedSignature===razorpay_signature)
    {
        //enroll student in course
        await enrolledStudents(courses,userId,res);
        //return res
        return res.status(200).json({success:true, message:"Payment Verified"});
    }
    return res.status(200).json({success:"false", message:"Payment Failed"});
     

}
//enrolling the students
const enrolledStudents=async(courses,userId,res)=>
{
    console.log("i m in")
    if(!courses || !userId)
    {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses)
    {
        try 
        {
            const enrolledCourse=await Course.findOneAndUpdate({_id:courseId},
                {
                    $push:{enrolledStudent:userId}
                    
                },{new:true})
                if(!enrolledCourse) {
                    return res.status(500).json({success:false,message:"Course not Found"});
                }

            //if student get enrolled add the course to student enrolledCourses
            const enrolledStudent=await User.findByIdAndUpdate(userId,
                {
                    $push:{courses:courseId}
                },{new:true})

            //if course get added send student a mail tgat u buy the
            //course
         console.log("its done")
            await mailSender(enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName} `,
            courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName} ${enrolledStudent.lastName}`))
        
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
}
//student enrolled payment successful email

exports.sendPaymentSuccessEmail=async(req,res)=>
{
    const {orderId,paymentId,amount}=req.body;
    const userId=req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});

    }
    try 
    {
         const enrolledStudent=await User.findById(userId);
           
         

         await mailSender(enrolledStudent.email,
            "Payment Successful",
            paymentSuccessEmail(`${enrolledStudent.firstName}`,amount/100,orderId,paymentId))
    }
    catch(error)
    {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}


//capture the payment and create RazorPay Order
// exports.capturePayment=async(req,res)=>
// {
//     //get the data user who want to buy and course to be buy
//     const {courseId}=req.body;
//     const userId=req.user.id;

//     //validation
//     if(!courseId)
//     {
//         return res.status(400).json({
//             success:false,
//             message:"Please provide the courseid"
//         })
//     }
//     //check if such  course exist or not for that course id
//     let courseDetails;
//     try 
//     {
//         courseDetails=await Course.findById(courseId);

//         if(!courseDetails)
//         {
//             return res.json({
//                 success:false,
//                 message:'Could not find the course',
//             });
//         }
//         //if student already bought the course ,then also return 
//         //we get it by enrolledStudent from Course which is userid
//         //the id which we get from req.user.id is in string but in 
//         //course enrolled student it is in objectId  so WE CONVERT IT
//         const uuid=new mongoose.Types.ObjectId(userId)
//         if(courseDetails.studentEnrolled.includes(uuid))
//         {
//             return res.status(200).json({
//                 success:false,
//                 message:'Student is already enrolled',
//             })
//         }

//        }
//     catch(error)
//     {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }

//     //now create the order and than proceed furthe

//     const amount=courseDetails.price;
//     const currency="INR";

//     const options={
//         amount:amount*100,
//         currency:currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             userId,
//             course_Id:courseId
//         }
//     }

//     //CREATE ORDER
// try 
// {
//     const orderResponse=await instance.orders.create(options);
//     console.log(orderResponse);

//    return  res.status.json({
//           success:true,
//           courseName:courseDetails.courseName,
//           courseDescriptions:courseDetails.courseDescription,
//           thumbnail:courseDetails.thumbnail,
//           orderId:orderResponse.id,
//           currency:orderResponse.currency,
//           amount:orderResponse.amount

//     })
// }
// catch(error)
// {
//     console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order",
//         });
// }
    
   
// }

// //after order creation we have to authorise the order bhaiya payment shi hai ya nhi
// //matching secret_code(Signature) from reazzory pay and server

// exports.verifySignature=async(req,res)=>
// {
//     //signature we have on server
//     const webhookSecret="12345678";

    
//    //signature given by razprpay
//     const signature=req.headers["x-razorpay-signature"];

//     //lookrazorpay give use webhookSecret in an encrypted format
//     //and its not possible to reverse it and get the webhooksecret which 
//     //we put in razory pay so we convert server webhooksecret in same
//     //signature format as razorypay signature

 


// // Generating the Digest: Finally, the HMAC computation is finalized, and the resulting hash (digest)
// //  is generated in hexadecimal format using shasum.digest("hex"). This hash, represented as a hexadecimal string, 
// //  is then typically used for verification purposes, such as comparing it to an expected hash to ensure the integrity 
 
// //  and authenticity of the data transmitted over the webhook.

// // In summary, this code snippet is part of a process to generate a secure hash (HMAC) of the data received 
// // in an HTTP request (req.body) using the SHA-256 algorithm and a secret key (webhookSecret). This hash can then be used 
// // for authentication and integrity checking purposes.
//     //1 step
//        // Initializing HMAC Object: HMAC (Hash-based Message Authentication Code) is a mechanism for calculating a message authentication code using 
//     // a cryptographic hash function (in this case, SHA-256) in combination with a secret key. The crypto.createHmac 
//     // function initializes an HMAC object with the specified hashing algorithm (sha256) and the secret key (webhookSecret).
//     const shasum=crypto.createHmac("sha256",webhookSecret);
//     //2 step 
    
// // Updating the HMAC: In this step, the HMAC object is updated with the data from req.body. req.body typically
// //  represents the body of an HTTP request, which could contain various parameters and data. In this case, JSON.stringify(req.body)
// //   converts the request body (which is assumed to be in JSON format) into a string, and then shasum.update() incorporates 
// //   this string into the HMAC computation.
//     shasum.update(JSON.stringify(req.body));

//     //3 step
//     // Generating the Digest: Finally, the HMAC computation is finalized, and the resulting hash (digest)
// //  is generated in hexadecimal format using shasum.digest("hex"). This hash, represented as a hexadecimal string, 
// //  is then typically used for verification purposes, such as comparing it to an expected hash to ensure the integrity 
 
// //  and authenticity of the data transmitted over the webhook.

// // In summary, this code snippet is part of a process to generate a secure hash (HMAC) of the data received 
// // in an HTTP request (req.body) using the SHA-256 algorithm and a secret key (webhookSecret). This hash can then be used 
// // for authentication and integrity checking purposes.
//     const digest=shasum.digest("hex");

//     if(signature===digest)
//     {
//         console.log("payment successful")
//         const {userId,course_Id}=req.body.payload.payment.entity.notes
       
//         //it means payment successfull now enrolled student in course and 
//         try 
//         {
//             const enrolledCourse=await Course.findByIdAndUpdate({_id: course_Id},
//                 {
//                     $push:{studentEnrolled:userId}
//                 },
//                 {
//                     new:true
//                 })
    
//                 if(!enrolledCourse) {
//                     return res.status(500).json({
//                         success:false,
//                         message:'Course not Found',
//                     });
//                 }
//                 console.log(enrolledCourse)
    
//                 //now we have to put course in courses of user also
    
//                 const enrolledStudent=await User.findByIdAndUpdate({_id:course_Id},
//                     {
//                         $push:{courses:course_Id}
//                     },{new:true})
//                     console.log(enrolledStudent);
    
//                     //mail send krdo confirmation wala 
//                     const emailResponse = await mailSender(
//                                             enrolledStudent.email,
//                                           courseEnrollmentEmail(enrolledCourse.courseName,enrolledStudent.firstName)
//                     );
    
//                     console.log(emailResponse);
//                     return res.status(200).json({
//                         success:true,
//                         message:"Signature Verified and COurse Added",
//                     });
//         }
       


             
//         catch(error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }

//     }

     
//     else{
//         return res.status(400).json({
//             success:false,
//             message:'Invalid request',
//         });
//     }



// }