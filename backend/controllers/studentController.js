// backend/controllers/studentController.js
const Student = require("../models/Student");
const sendOtp = require("../utils/sendOtp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const otpStore = {}; // In-memory OTP store

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

exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: "Email not registered." });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password." });

    const token = jwt.sign({ id: student._id, role: student.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.status(200).json({ token, message: "Login successful", role: student.role });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login failed." });
  }
};

