const createError = require("http-errors");
const jwt = require('jsonwebtoken');
const { User } = require("../models/userModel");
const { jsonKey } = require("../../secret");

const processRegister = async (req, res, next) => {
    try {
      const {fName, lName, email, password, mobile, gender} = req.body;

      const userExist = await User.exists({email : email})
      if(userExist){
        throw createError(409, "User already exists with this email. please login")
      }

    //   create jwt 

    const token = jwt.sign({fName, lName, email, password, mobile, gender}, jsonKey, 24 * 60 * 60 * 1000)

    // prepare email 
      const emailData = {
        email,
        subject : "Account Activation Email",
        html : `
            <h2>Hello ${fName}" " ${lName} ! </h2>
            <p>Please Click here to <a href="${clientURL}/api/users/activate/${token}">activate your account</a></p>
        `
      }

    // send email with nodemailer 
      try {
        await emailWithNodeMail(emailData)
        
      } catch (error) {
        next(createError(500, "Failed to send varification email"))
        return;
      }
    return successResponse(res, {
            statusCode : 200,
            message : `Please go to your ${email} for completing your registration process`,
            payload : { token }
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    processRegister
}