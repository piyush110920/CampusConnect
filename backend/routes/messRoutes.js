const express = require('express');
const router = express.Router();
const messController = require('../controllers/messController');
const { protect, authenticateMess } = require("../middleware/authMiddleware");

router.post('/generate-otp', messController.generateOtp);
router.post('/signup', messController.signupMessProvider);
router.post('/login', messController.loginMessProvider);
router.post('/forgot-password/send-otp', messController.sendMessResetOtp);
router.post('/forgot-password/reset', messController.resetMessPassword);

// ✅ Use controller correctly
router.get("/messages", authenticateMess, messController.getMessMessages);

router.get('/mess-profilepage', protect, messController.getMessProfile);

module.exports = router;
