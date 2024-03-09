const express=require("express");
const router=express.Router();

const {changePassword,
    login,
    signUp,
    sendOTP
}=require("../controllers/Auth.controller");

const {resetPasswordToken,resetPassword}=require("../controllers/ResetPassword.js")


const {auth}=require("../middlewares/auth.js");

//////////////////////Authentication Routes

//route for login
router.post("/login",login);

//route for signup
router.post("/signup",signUp);

//route for changePassword
router.post("/changePassword",auth,changePassword);

//send otp

router.post("/sendOtp",sendOTP)

//////////reset password

//reset password token generation

router.post("/reset_password_token",resetPasswordToken);

//reset password after verification from db and ui

router.post("/reset_password",resetPassword);

module.exports=router;

