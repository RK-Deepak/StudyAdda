const express=require("express");
const router=express.Router();

const {capturePayment,verifyPayment,sendPaymentSuccessEmail} =require("../controllers/Payments.js");

const {auth,isStudent}=require("../middlewares/auth.js");

const {PurchaseDetails}=require("../controllers/Purchase.controller.js");
router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifyPayment",auth,isStudent,verifyPayment);
router.post("/sendPaymentSuccessEmail",auth,isStudent,sendPaymentSuccessEmail);
router.get("/getPurchases",auth,isStudent,PurchaseDetails);

module.exports=router