// externel module/middleware imports
const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const hpp = require('hpp');
const morgan = require('morgan');
const helmet = require('helmet');
const createError = require('http-errors')

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
const { errorResponse } = require('./src/controllers/responseController');
const router = require('./src/routes/api');
const limiter = limit({
    windowMs : 1 * 60 * 1000,
    max : 20,
    message: 'too many requests sent by this ip, please try again in an minute !'
});

app.use(limiter);


// router implement 
app.use( router)

// api testing 
app.get('/test', (req, res) => {
    res.status(200).send({
        message : 'API Testing is Working Fine'
    });
});  

// client error handling  
app.use((req, res, next) => { 
    next(createError(404, 'Route Not Found'));
})

// server error handling -> finally all the error here is
app.use((err, req, res, next) => {
   
    return errorResponse(res, {
        statusCode : err.status,
        message : err.message
    })
})

module.exports = {
    app
}



