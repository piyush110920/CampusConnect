// backend/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/generate-otp', studentController.generateOtp);
router.post('/signup', studentController.signupStudent);
router.post('/login', studentController.loginStudent);
router.post('/forgot-password/send-otp', studentController.sendForgotPasswordOtp);
router.post('/forgot-password/reset', studentController.resetStudentPassword);


module.exports = router;