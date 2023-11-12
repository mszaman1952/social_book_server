const nodemailer = require('nodemailer');
const { smtpUsername, smtpPassword } = require('../../secret');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: smtpUsername,
    pass: smtpPassword
  }
});

const emailWithNodeMail = async (emailData) => {
   try {
    const mailOptions = {
        from: smtpUsername,
        to: emailData.email,
        subject: emailData.subject, // Subject line
        html: emailData.html,
    }
    const info = await transporter.sendMail(mailOptions)
    console.log("Message sent: %s", info.response)
   } catch (error) {
    console.error("Error Occured while sending email: ", error);
    throw error;
   }
}

module.exports = emailWithNodeMail;