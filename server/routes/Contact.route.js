const express=require("express");
const router=express.Router();

const {contactForm}=require("../controllers/Contact.controller.js")

router.post("/createContact",contactForm);

module.exports=router