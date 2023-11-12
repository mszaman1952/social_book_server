const createError = require("http-errors");
const jwt = require('jsonwebtoken');
const {
    User
} = require("../models/userModel");
const {
    jsonKey
} = require("../../secret");
const {
    successResponse
} = require("./responseController");
const SendEmailUtility = require("../helpers/nodeMailer");

const processRegister = async (req, res, next) => {
    try {
        const {
            fName,
            lName,
            email,
            password,
            mobile,
            gender
        } = req.body;

        const userExist = await User.exists({
            email: email
        })
        if (userExist) {
            throw createError(409, "User already exists with this email. please login")
        }

        //   create jwt 

        const token = jwt.sign({
            fName,
            lName,
            email,
            password,
            mobile,
            gender
        }, jsonKey, {
            expiresIn: "24h"
        });
        // prepare email 
        try {
            let code = Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase();

            if (code.length <= 5) {
                let num = Math.floor(10 + Math.random() * 6).toString(16).toUpperCase();
                code = code + num;
            } else {
                return code
            };
            let EmailText = "Your verification code is " + code;

            await SendEmailUtility(email, EmailText, " Email Verification");

            await User.updateOne({
                email: email
            }, {
                $set: {
                    otp: code
                }
            }, {
                upsert: true
            })
            return successResponse(res, {
                statusCode: 200,
                message: `Please go to your ${email} for completing your registration process`,
                payload: {
                    token
                }
            })
        } catch (e) {
            next(createError(500, "Failed to send varification email"))
            return;
        }

    } catch (error) {
        next(error)
    }
}
module.exports = {
    processRegister
}