// import nodemailer from 'nodemailer'
// import  dotenv from 'dotenv';
// dotenv.config();

// async function sendEmail({to =[] , cc , bcc, subject , text ,html , attachments = []}= {}){
//     let transporter = nodemailer.createTransport({
//       service:'gmail',
//       auth: {
//          user: process.env.EMAIL_SEND, // generated ethereal user
//          pass: process.env.EMAIL_PASS, // generated ethereal password
//       },
    
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from:`"merna "<${process.env.EMAIL_SEND}>`, // sender address
//     to,
//     cc,
//     bcc,
//     subject , 
//     text, 
//     html,
//     attachments 
//   });
//   console.log("confirm email send success" ,info);
//   return info.rejected.length ? false:true

// }
//export default sendEmail