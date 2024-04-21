const mongoose = require('mongoose');

const purchaseSchema=new mongoose.Schema({

    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    courses:
    [
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    }],
    razorpay_order_id:
    {
         type:String,
        
         trim:true
    },
    razorpay_payment_id:
    {
         type:String,
        
         trim:true
    },
    razorpay_signature:
    {
         type:String,
        
         trim:true
    },




},{timestamps:true});

module.exports=mongoose.model("Purchase",purchaseSchema);