// Import
const user = require('../models/userModel')
const bcrypt = require('bcryptjs')


// main function for user login
exports.userLogin = async(req, res) => {
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Email and Password are required'
            })
        }

        const existingUser = await user.findOne({email}) // find user with email

        const matchPassword = await bcrypt.compare(password, existingUser.password); // password comparison process

        if(!existingUser || !matchPassword){
            return res.status(404).json({
                success: false,
                message: 'Login failed. Please enter valid email and password'
            })
        }
        else{
            return res.status(200).json({
                success: true,
                message: 'Login Success',
                data: existingUser
            })
        }
    }
    catch(error){
        return res.status(404).json({
            success: true,
            message: 'Something went wrong!'
        })
    }
}