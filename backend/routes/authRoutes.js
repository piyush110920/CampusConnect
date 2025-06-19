const express = require('express');
const router = express.Router();
const { generateOtp, signup } = require('../controllers/authController');

router.post('/student/generate-otp', generateOtp);
router.post('/student/signup', signup);

module.exports = router;
