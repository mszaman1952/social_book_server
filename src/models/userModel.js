const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fName : {
        type : String,
        trim : [true, "First Name is Required"],
        required : true,
        minlength : [3, "First Name Minimum 3 Character"]
    },
    lName : {
        type : String,
        trim : [true, "Last Name is Required"],
        required : true,
        minlength : [3, "Last Name Minimum 3 Character"]
    },
    email : {
        type : String,
        trim : [true, "Eamil is Required"],
        required : true,
        unique : true,
        lowercaes : true,
        validate : {
            validator : function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            },
            message : "Enter a Valid Email Address"
        }
    },
    mobile : {
        type : String, 
        required : true,
        trim : [true, "Mobile Number is Required..."],
        unique : true,
    },
    password : {
        type : String,
        trim : [true, "Password is Required"],
        required : true,
        minLength : [6, "Minimum lenght of 6 Character"],
        set : (v) => {
           return bcrypt.hashSync(v, bcrypt.genSaltSync(10))
        },
    },
    gender : {
        type : String,
        enum : ["male", "female", "transgender"]
    },
    role : {
        type : String,
        enum : ["user","admin","super admin"],
        default : "user"
    },
    isBanned : {
        type : Boolean,
        default : false
    }
},
{ timestamps : true, versionKey : false });

const User = mongoose.model("User", userSchema);

module.exports = { User }