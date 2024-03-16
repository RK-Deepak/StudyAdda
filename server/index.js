const express=require("express");
const app=express();



//get routes
const userRoutes=require("./routes/User.route.js");
const profileRoutes=require("./routes/Profile.route.js");
const paymentRoutes=require("./routes/Payment.route.js");
const courseRoutes=require("./routes/Couse.route.js");
const contactRoutes=require("./routes/Contact.route.js")

const cookieParser=require("cookie-parser");
const connectDB=require("./config/database.js");
const cors=require("cors");
const {cloudinaryConnect}=require("./config/cloudinary.js");
const fileUpload=require("express-fileupload");

require("dotenv").config();
const PORT=process.env.PORT || 4000

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors
    ({
         origin:"*",
         credentials:true
    }))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

//database connectivity
connectDB();

//cloudinaryConnect
cloudinaryConnect();

//route mounting
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes)
app.use("/api/v1/contact",contactRoutes)

app.get("/",(req,res)=>
{
    return res.json({
		success:true,
		message:'Your server is up and running....'
	});
})

app.listen(PORT,()=>
{
    console.log(`Server connection is established on ${PORT}`)
})