// routes/messRoutes.js

const express = require('express');
const router = express.Router();
const messController = require('../controllers/messController');

router.post('/generate-otp', messController.generateOtp);
router.post('/signup', messController.signupMessProvider);
router.post('/login', messController.loginMessProvider);

// Forgot password routes
router.post('/forgot-password/send-otp', messController.sendMessResetOtp);
router.post('/forgot-password/reset', messController.resetMessPassword);

module.exports = router;
