// backend/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware'); // 👈 import middleware
const { contactAdmin } = require("../controllers/studentController");
const { sendRoomMessage } = require("../controllers/studentController");
// Auth & OTP Routes
router.post('/generate-otp', studentController.generateOtp);
router.post('/signup', studentController.signupStudent);
router.post('/login', studentController.loginStudent);
router.post('/forgot-password/send-otp', studentController.sendForgotPasswordOtp);
router.post('/forgot-password/reset', studentController.resetStudentPassword);
router.post('/suggestions', protect, studentController.addSuggestionToStudent);
router.post('/rate-mess', protect, studentController.rateMess);
router.post('/rate-room', protect, studentController.rateRoom);
router.post("/send-mess-message", protect, studentController.sendMessMessage);
router.post("/send-room-message", protect, sendRoomMessage);
router.post("/request-mess", protect, studentController.requestMessService);
router.post('/add-suggestion', protect, studentController.addSuggestionToStudent);



router.post('/contact', studentController.sendContactMessage); // ✅ Correct

// ✅ Secure Profile Route (requires token)
router.get('/profile', protect, studentController.getStudentProfile);
router.get('/suggestions', protect, studentController.getAllSuggestions);

module.exports = router;
