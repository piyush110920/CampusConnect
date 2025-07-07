const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { protect, authenticateRoom } = require('../middleware/authMiddleware');

// Room Provider Auth Routes
router.post('/generate-otp', roomController.generateOtp);
router.post('/signup', roomController.signupRoomProvider);
router.post('/login', roomController.loginRoomProvider);

// Forgot Password Routes
router.post('/forgot-password/send-otp', roomController.sendRoomResetOtp);
router.post('/forgot-password/reset', roomController.resetRoomPassword);

// Protected Room Profile Page
router.get('/room-profilepage', protect, roomController.getRoomProfile);

// ✅ Messages from students
router.get('/messages', authenticateRoom, roomController.getRoomMessages);

module.exports = router;
