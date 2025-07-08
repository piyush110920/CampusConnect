const RoomProvider = require("../models/RoomProvider");
const sendOtp = require("../utils/sendOtp");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const RoomRequest = require("../models/RoomRequest");
const Student = require("../models/Student");

const RoomMessage = require("../models/RoomMessage");

const signupOtpStore = {}; // For signup
const resetOtpStore = {};  // For password reset

exports.generateOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    await sendOtp(email, otp);
    signupOtpStore[email] = otp;
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

exports.signupRoomProvider = async (req, res) => {
  const {
    fullName, email, phone, messName,
    plotNumber, street, landmark, city, pincode,
    password, confirmPassword, otp, price // 👈 added price
  } = req.body;

  if (signupOtpStore[email] !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  try {
    const existing = await RoomProvider.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRoom = new RoomProvider({
      fullName,
      email,
      phone,
      messName,
      address: { plotNumber, street, landmark, city, pincode },
      password: hashedPassword,
      role: "room",
      monthlyPrice: price // ✅ saving the monthly price
    });

    await newRoom.save();
    delete signupOtpStore[email];

    res.status(201).json({ message: "Room Provider registered successfully!" });
  } catch (err) {
    console.error("Room signup error:", err);
    res.status(500).json({ message: "Signup failed. Try again." });
  }
};

exports.loginRoomProvider = async (req, res) => {
  const { email, password } = req.body;

  try {
    const room = await RoomProvider.findOne({ email });
    if (!room) return res.status(404).json({ message: "Email not registered." });

    const isMatch = await bcrypt.compare(password, room.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password." });

    const token = generateToken({ id: room._id, role: room.role });

    return res.status(200).json({
      message: "Login successful",
      token,
      role: room.role
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Login failed due to server error." });
  }
};

exports.sendRoomResetOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    const user = await RoomProvider.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not registered." });

    await sendOtp(email, otp);
    resetOtpStore[email] = otp;

    res.status(200).json({ message: "OTP sent to email." });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

exports.resetRoomPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!resetOtpStore[email] || resetOtpStore[email] !== otp) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }

  try {
    const room = await RoomProvider.findOne({ email });
    if (!room) return res.status(404).json({ message: "Email not registered." });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    room.password = hashedPassword;
    await room.save();

    delete resetOtpStore[email];

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reset password." });
  }
};



// Get Mess Provider Profile
// GET /api/mess/mess-profilepage
exports.getRoomProfile = async (req, res) => {
  try {
    const room = await RoomProvider.findById(req.user.id).select("-password");

    if (!room) return res.status(404).json({ message: "Room provider not found" });

    // Assume rating & connectionCount are stored in DB
    res.json({
      fullName: room.fullName,
      messName: room.messName,
      email: room.email,
      phone: room.phone,
      address: room.address,
      monthlyPrice: room.monthlyPrice,
      averageRating: room.averageRating || 0,
      ratingSum: room.ratingSum || 0,
      connectionCount: room.connectionCount || 0
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch room profile" });
  }
};

exports.getRoomMessages = async (req, res) => {
  try {
    const roomId = req.user.id;

    const messages = await RoomMessage.find({ roomId }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Room Messages Error:", err);
    res.status(500).json({ message: "Failed to fetch room messages" });
  }
};

exports.getRoomRequests = async (req, res) => {
  try {
    const providerId = req.user.id;

    const requests = await RoomRequest.find({ room: providerId })
      .populate("student")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (err) {
    console.error("Room Request Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch room requests" });
  }
};

// Accept a room request
exports.acceptRoomRequest = async (req, res) => {
  try {
    const { studentId } = req.body;
    const providerId = req.user.id;

    const request = await RoomRequest.findOneAndUpdate(
      { student: studentId, room: providerId, status: "Pending" },
      { status: "Accepted" },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    await Student.findByIdAndUpdate(studentId, {
      selectedRoom: providerId,
      roomRequestStatus: "Accepted"
    });

    res.status(200).json({ message: "Room request accepted" });
  } catch (err) {
    console.error("Accept Room Request Error:", err);
    res.status(500).json({ message: "Failed to accept request" });
  }
};
// Get connected room students (accepted)
exports.getConnectedRoomStudents = async (req, res) => {
  try {
    const roomId = req.user.id;

    const acceptedRequests = await RoomRequest.find({
      room: roomId,
      status: 'Accepted'
    }).populate('student');

    const connectedStudents = acceptedRequests.map(r => r.student);
    res.status(200).json(connectedStudents);
  } catch (err) {
    console.error("Fetch Connected Room Students Error:", err);
    res.status(500).json({ message: "Failed to fetch connected room students" });
  }
};
