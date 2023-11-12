const express = require('express');
const { processRegister } = require('../controllers/userController');

const router = express.Router();

// user route area 
router.post('/register', processRegister)

module.exports = router;