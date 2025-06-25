const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.post('/generate-otp', roomController.generateOtp);
router.post('/signup', roomController.signupRoomProvider);
router.post('/login', roomController.loginRoomProvider);

// Password reset via email
router.post('/forgot-password/send-otp', roomController.sendRoomResetOtp);
router.post('/forgot-password/reset', roomController.resetRoomPassword);

module.exports = router;
