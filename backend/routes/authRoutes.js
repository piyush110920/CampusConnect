const express = require('express');
const router = express.Router();
const { generateStudentOtp, registerStudent } = require('../controllers/authController');

router.post('/generate-otp', generateStudentOtp);
router.post('/signup', registerStudent);

module.exports = router;
