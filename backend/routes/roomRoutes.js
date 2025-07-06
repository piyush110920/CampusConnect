const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate-otp', roomController.generateOtp);
router.post('/signup', roomController.signupRoomProvider);
router.post('/login', roomController.loginRoomProvider);

// Password reset via email
router.post('/forgot-password/send-otp', roomController.sendRoomResetOtp);
router.post('/forgot-password/reset', roomController.resetRoomPassword);

router.get('/room-profilepage', protect, roomController.getRoomProfile);


module.exports = router;
