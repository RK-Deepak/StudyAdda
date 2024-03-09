const nodemailer=require("nodemailer");

require("dotenv").config();
const mailSender=(email,title,body)=>
{
    try
    {
        //created transporter
       let transporter=nodemailer.createTransport({
          host:process.env.MAIL_HOST,
          auth:
          {
              user:process.env.MAIL_USER,
              pass:process.env.MAIL_PASS
          }
       })
    //send mail via transporter
       let info=transporter.sendMail({
        from:"StudyAdda || Affiliated by RK_Deepak",
        to:`${email}`,
        subject:`${title}`,
        html:`${body}`
       })
       console.log(info);
       return info;
    }
    catch(error)
    {
        console.log(error.message)
    }
}

module.exports=mailSender

