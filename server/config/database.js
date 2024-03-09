const mongoose=require("mongoose");

require("dotenv").config();
const connectDB=()=>
{
      mongoose.connect(process.env.DATABASE_URL)
      .then(()=>
      {
        console.log("Database is connected successfully")
      })
      .catch((error)=>
      {
          console.log(error.message);
          console.log("Issue in database connectivity");
          process.exit(1)
      })


}
module.exports=connectDB;