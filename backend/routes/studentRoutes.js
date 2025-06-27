// backend/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware'); // 👈 import middleware

// Auth & OTP Routes
router.post('/generate-otp', studentController.generateOtp);
router.post('/signup', studentController.signupStudent);
router.post('/login', studentController.loginStudent);
router.post('/forgot-password/send-otp', studentController.sendForgotPasswordOtp);
router.post('/forgot-password/reset', studentController.resetStudentPassword);
router.post('/suggestions', protect, studentController.addSuggestionToStudent);

// ✅ Secure Profile Route (requires token)
router.get('/profile', protect, studentController.getStudentProfile);
router.get('/suggestions', protect, studentController.getAllSuggestions);

module.exports = router;
