const express = require('express');
const router = express.Router();
const messController = require('../controllers/messController');

router.post('/generate-otp', messController.generateOtp);
router.post('/signup', messController.signupMessProvider);

router.post('/login', messController.loginMessProvider);

module.exports = router;
