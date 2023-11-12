const nodemailer = require('nodemailer');
const { smtpPassword, smtpUsername } = require('../../secret');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: smtpUsername,
            pass: smtpPassword
        } 
    });

    let mailOptions = {
        from: 'mszaman1952.1971@gmail.com',
        to: EmailTo,
        text: EmailText,
        subject: EmailSubject,
    };

    return  await transporter.sendMail(mailOptions)

}
module.exports=SendEmailUtility

