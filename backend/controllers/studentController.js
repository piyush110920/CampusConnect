// backend/controllers/studentController.js
const Student = require("../models/Student");
const sendOtp = require("../utils/sendOtp");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const Mess = require("../models/MessProvider");
const Room = require("../models/RoomProvider");

const otpStore = {}; // In-memory OTP store

// Generate OTP for Email Verification
exports.generateOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    await sendOtp(email, otp);
    otpStore[email] = otp;
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
    console.error("OTP Error:", err);
    res.status(500).json({ message: "Error generating OTP." });
  }
};

// Signup Handler
exports.signupStudent = async (req, res) => {
  const {
    fullName, email, password, college,
    plotNumber, landmark, area, city, state, country, pinCode, otp
  } = req.body;

  if (otpStore[email] !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      fullName,
      email,
      password: hashedPassword,
      college,
      address: { plotNumber, landmark, area, city, state, country, pinCode }
    });

    await newStudent.save();
    delete otpStore[email];
    res.status(201).json({ message: "Student registered successfully!" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Signup failed. Try again." });
  }
};

// Login Handler with JWT Token
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: "Email not registered." });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password." });

    // Generate JWT Token
    const token = generateToken({ id: student._id, role: student.role });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        role: student.role
      }
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login failed. Try again." });
  }
};

exports.sendForgotPasswordOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    await sendOtp(email, otp);
    otpStore[email] = otp;
    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// POST: /student/forgot-password/reset
exports.resetStudentPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    if (otpStore[email] !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    await student.save();

    delete otpStore[email];
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};

// GET /api/student/profile
exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({
      fullName: student.fullName,
      email: student.email,
      college: student.college,
      address: student.address,
    });
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};


// Get all Mess and Room services
exports.getAllSuggestions = async (req, res) => {
  try {
    const messes = await Mess.find();
    const rooms = await Room.find();
    res.status(200).json({ messes, rooms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch suggestions" });
  }
};

// Add selected mess/room to student profile
exports.addSuggestionToStudent = async (req, res) => {
  const { type, providerId } = req.body;

  try {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (type === "mess") {
      student.selectedMess = providerId;
    } else if (type === "room") {
      student.selectedRoom = providerId;
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }

    await student.save();
    res.status(200).json({ message: "Service added to student profile" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update student suggestions" });
  }
};


// GET /api/student/profile
exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id)
      .populate({ path: "selectedMess", model: "MessProvider" })
      .populate({ path: "selectedRoom", model: "RoomProvider" });


    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({
      fullName: student.fullName,
      email: student.email,
      college: student.college,
      address: student.address,
      selectedMess: student.selectedMess,
      selectedRoom: student.selectedRoom
    });
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
