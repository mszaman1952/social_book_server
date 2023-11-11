// externel module/middleware imports
const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const hpp = require('hpp');
const morgan = require('morgan');
const helmet = require('helmet');

// create express instance 
const app = express();

// request process
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

// implement application middleware 
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(hpp());
 
// dotEnv config
dotEnv.config();

// express ratelimiter import and implementation
const limit = require('express-rate-limit');
const limiter = limit({
    windowMs : 1 * 60 * 1000,
    max : 20,
    message: 'too many requests sent by this ip, please try again in an minute !'
});

app.use(limiter);

// router implement 

// client error router 
app.use((req, res, next) =>{
    res.status(404).json({
        status : "Failed",
        data : "Route Not !Found!!!"
    });
    next();
});

// server side error handling and all error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!'); 
})

module.exports = {
    app
}



