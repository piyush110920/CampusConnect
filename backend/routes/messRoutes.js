// routes/messRoutes.js

const express = require('express');
const router = express.Router();
const messController = require('../controllers/messController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate-otp', messController.generateOtp);
router.post('/signup', messController.signupMessProvider);
router.post('/login', messController.loginMessProvider);

// Forgot password routes
router.post('/forgot-password/send-otp', messController.sendMessResetOtp);
router.post('/forgot-password/reset', messController.resetMessPassword);

// ✅ Fixed route: Use getMessProfile instead of getStudentProfile
router.get('/mess-profilepage', protect, messController.getMessProfile);

module.exports = router;
