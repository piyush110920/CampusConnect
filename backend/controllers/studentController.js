// backend/controllers/studentController.js
const Student = require("../models/Student");
const sendOtp = require("../utils/sendOtp");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const Mess = require("../models/MessProvider");
const Room = require("../models/RoomProvider");
const sendContactMail = require('../utils/sendContactMail');
const authMiddleware = require("../middleware/authMiddleware");
const MessMessage = require("../models/MessMessage");
const RoomMessage = require("../models/RoomMessage");


const RoomRequest = require('../models/RoomRequest');
const MessRequest = require("../models/MessRequest");

const nodemailer = require("nodemailer");

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
    fullName,
    email,
    phoneNumber,
    password,
    college,
    plotNumber,
    landmark,
    area,
    city,
    state,
    country,
    pinCode,
    otp
  } = req.body;

  // 🔐 OTP validation
  if (otpStore[email] !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  try {
    // 📧 Check for existing email
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 🔒 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new student
    const newStudent = new Student({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      college,
      address: {
        plotNumber,
        landmark,
        area,
        city,
        state,
        country,
        pinCode
      }
    });

    // 💾 Save to database
    await newStudent.save();

    // 🧹 Clean up OTP store
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
// controllers/studentController.js


exports.addSuggestionToStudent = async (req, res) => {
  const { type, providerId } = req.body;

  try {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // ------------------------ MESS ------------------------
    if (type === "mess") {
      // ❌ Remove old accepted request if switching
      if (student.selectedMess && student.selectedMess.toString() !== providerId) {
        await MessRequest.deleteOne({
          student: student._id,
          mess: student.selectedMess,
          status: 'Accepted',
        });
      }

      // ✅ Check if there's already a pending request
      const existing = await MessRequest.findOne({
        student: student._id,
        mess: providerId,
        status: 'Pending',
      });

      if (!existing) {
        await MessRequest.create({
          student: student._id,
          mess: providerId,
          status: 'Pending',
        });
      }

    // ------------------------ ROOM ------------------------
    } else if (type === "room") {
      // ❌ Remove old accepted request if switching
      if (student.selectedRoom && student.selectedRoom.toString() !== providerId) {
        await RoomRequest.deleteOne({
          student: student._id,
          room: student.selectedRoom,
          status: 'Accepted',
        });
      }

      // ✅ Check if there's already a pending request
      const existing = await RoomRequest.findOne({
        student: student._id,
        room: providerId,
        status: 'Pending',
      });

      if (!existing) {
        await RoomRequest.create({
          student: student._id,
          room: providerId,
          status: 'Pending',
        });
      }

    } else {
      return res.status(400).json({ message: "Invalid type" });
    }

    res.status(200).json({ message: "Request sent. Awaiting provider approval." });

  } catch (err) {
    console.error("❌ Suggestion Add Error:", err);
    res.status(500).json({ message: "Failed to send request" });
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
      selectedRoom: student.selectedRoom,
      selectedMessDate: student.selectedMessDate,
      selectedRoomDate: student.selectedRoomDate
    });
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// POST /api/student/contact
// controllers/studentController.js

exports.sendContactMessage = async (req, res) => {
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Contact Form Message from ${fullName}`,
      text: `From: ${fullName}\nEmail: ${email}\n\n${message}`,
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ message: "Failed to send message." });
  }
};


exports.rateMess = async (req, res) => {
  const { rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5." });
  }

  try {
    const student = await Student.findById(req.user.id);
    if (!student || !student.selectedMess) {
      return res.status(404).json({ message: "No mess selected to rate." });
    }

    const mess = await Mess.findById(student.selectedMess);
    if (!mess) {
      return res.status(404).json({ message: "Mess provider not found." });
    }

    const previousRating = student.selectedMessRating;

    // Update rating
    if (previousRating) {
      mess.ratingSum = mess.ratingSum - previousRating + rating;
    } else {
      mess.ratingSum += rating;
      mess.totalRatings += 1;
    }

    mess.averageRating = mess.ratingSum / mess.totalRatings;
    student.selectedMessRating = rating;

    await mess.save();
    await student.save();

    res.status(200).json({ message: "Rating submitted successfully", averageRating: mess.averageRating });
  } catch (err) {
    console.error("Rate Mess Error:", err);
    res.status(500).json({ message: "Failed to rate mess." });
  }
};
exports.rateRoom = async (req, res) => {
  const { rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5." });
  }

  try {
    const student = await Student.findById(req.user.id);
    if (!student || !student.selectedRoom) {
      return res.status(404).json({ message: "No room selected to rate." });
    }

    const room = await Room.findById(student.selectedRoom);
    if (!room) {
      return res.status(404).json({ message: "Room provider not found." });
    }

    const previousRating = student.selectedRoomRating;

    if (previousRating) {
      room.ratingSum = room.ratingSum - previousRating + rating;
    } else {
      room.ratingSum += rating;
      room.totalRatings += 1;
    }

    room.averageRating = room.ratingSum / room.totalRatings;
    student.selectedRoomRating = rating;

    await room.save();
    await student.save();

    res.status(200).json({
      message: "Rating submitted successfully",
      averageRating: room.averageRating
    });
  } catch (err) {
    console.error("Rate Room Error:", err);
    res.status(500).json({ message: "Failed to rate room." });
  }
};

exports.sendMessMessage = async (req, res) => {
  try {
    const studentId = req.user.id;
    const student = await Student.findById(studentId).populate("selectedMess");

    if (!student.selectedMess) {
      return res.status(400).json({ message: "No mess provider selected" });
    }

    const newMessage = new MessMessage({
      studentId,
      messId: student.selectedMess._id,
      studentName: student.fullName,
      studentPhone: student.phoneNumber, // 🔴 THIS LINE
      message: req.body.message,
    });

    await newMessage.save();

    res.status(201).json({ message: "Message sent to mess provider" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

exports.sendRoomMessage = async (req, res) => {
  try {
    const studentId = req.user.id;
    const student = await Student.findById(studentId).populate("selectedRoom");

    if (!student.selectedRoom) {
      return res.status(400).json({ message: "No room provider selected" });
    }

    const newMessage = new RoomMessage({
      studentId,
      roomId: student.selectedRoom._id,
      studentName: student.fullName,
      studentPhone: student.phoneNumber,
      message: req.body.message,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent to room provider" });
  } catch (error) {
    console.error("Send Room Message Error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

exports.sendMessConnectionRequest = async (req, res) => {
  const studentId = req.user.id;
  const { messId } = req.body;

  try {
    const existingRequest = await MessRequest.findOne({ studentId, status: 'Pending' });
    if (existingRequest) {
      return res.status(400).json({ message: "You already have a pending request." });
    }

    await MessRequest.create({
      studentId,
      messId,
      type: "Connect",
    });

    // Update student profile to block other interests
    await Student.findByIdAndUpdate(studentId, { messRequestStatus: 'Pending', selectedMess: messId });

    res.status(200).json({ message: "Request sent to mess provider." });
  } catch (err) {
    res.status(500).json({ message: "Failed to send request." });
  }
};

exports.sendMessDisconnectRequest = async (req, res) => {
  const studentId = req.user.id;
  const student = await Student.findById(studentId);
  const messId = student.selectedMess;

  if (!messId) return res.status(400).json({ message: "No mess currently selected." });

  await MessRequest.create({
    studentId,
    messId,
    type: "Disconnect"
  });

  res.status(200).json({ message: "Disconnect request sent." });
};


// Student requests a mess
exports.requestMessService = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { providerId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (student.selectedMess?.toString() === providerId) {
      return res.status(400).json({ message: "You have already selected this mess" });
    }

    // Disconnect logic: store previous mess if switching
    if (student.selectedMess && student.selectedMess.toString() !== providerId) {
      student.previousMess = student.selectedMess;
      student.selectedMess = null;
      student.messRequestStatus = 'Pending';

      await MessRequest.create({
        studentId,
        messId: providerId,
        status: 'Pending'
      });

      await student.save();
      return res.status(200).json({ message: "Requested new mess. Awaiting approval." });
    }

    // Initial request
    student.messRequestStatus = 'Pending';

    await MessRequest.create({
      studentId,
      messId: providerId
    });

    await student.save();
    res.status(200).json({ message: "Request sent to mess provider" });

  } catch (error) {
    console.error("Mess request error:", error);
    res.status(500).json({ message: "Failed to request mess" });
  }
};

// Request a Room
exports.requestRoomService = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { providerId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (student.selectedRoom?.toString() === providerId) {
      return res.status(400).json({ message: "You have already selected this room" });
    }

    // Switching room
    if (student.selectedRoom && student.selectedRoom.toString() !== providerId) {
      student.previousRoom = student.selectedRoom;
      student.selectedRoom = null;
      student.roomRequestStatus = 'Pending';

      await RoomRequest.create({
        student: studentId,
        room: providerId,
        status: 'Pending'
      });

      await student.save();
      return res.status(200).json({ message: "Requested new room. Awaiting approval." });
    }

    // First-time request
    student.roomRequestStatus = 'Pending';

    await RoomRequest.create({
      student: studentId,
      room: providerId,
    });

    await student.save();
    res.status(200).json({ message: "Room request sent" });

  } catch (err) {
    console.error("Room request error:", err);
    res.status(500).json({ message: "Failed to request room" });
  }
};
// Request to disconnect from current Room
exports.sendRoomDisconnectRequest = async (req, res) => {
  const studentId = req.user.id;
  const student = await Student.findById(studentId);
  const roomId = student.selectedRoom;

  if (!roomId) return res.status(400).json({ message: "No room currently selected." });

  try {
    await RoomRequest.create({
      student: studentId,
      room: roomId,
      status: 'Pending',
    });

    student.roomRequestStatus = 'Pending';
    await student.save();

    res.status(200).json({ message: "Disconnect request sent." });
  } catch (err) {
    console.error("Room disconnect error:", err);
    res.status(500).json({ message: "Failed to send disconnect request." });
  }
};
