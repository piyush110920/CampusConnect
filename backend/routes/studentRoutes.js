// backend/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/generate-otp', studentController.generateOtp);
router.post('/signup', studentController.signupStudent);
router.post('/login', studentController.loginStudent);

module.exports = router;