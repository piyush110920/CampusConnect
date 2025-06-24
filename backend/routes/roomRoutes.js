const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.post('/generate-otp', roomController.generateOtp);
router.post('/signup', roomController.signupRoomProvider);
router.post('/login', roomController.loginRoomProvider);

module.exports = router;







