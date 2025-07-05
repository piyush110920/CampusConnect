const MessProvider = require("../models/MessProvider");
const sendOtp = require("../utils/sendOtp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const otpStore = {};
const resetOtpStore = {}; // Store for password reset OTPs

exports.generateOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    await sendOtp(email, otp);
    otpStore[email] = otp;
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP." });
  }
};
exports.signupMessProvider = async (req, res) => {
  const {
    fullName, companyName, email, phone,
    plotNumber, landmark, area, city, state,
    country, pincode, monthlyPrice, password, otp // ✅ monthlyPrice added here
  } = req.body;

  if (otpStore[email] !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  try {
    const existing = await MessProvider.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMess = new MessProvider({
      fullName,
      companyName,
      email,
      phone,
      address: { plotNumber, landmark, area, city, state, country, pincode },
      monthlyPrice, // ✅ monthlyPrice added here
      password: hashedPassword
    });

    await newMess.save();
    delete otpStore[email];
    res.status(201).json({ message: "Mess Provider registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed. Try again." });
  }
};

// ✅ NEW: Login Controller for Mess Provider
exports.loginMessProvider = async (req, res) => {
  const { email, password } = req.body;

  try {
    const mess = await MessProvider.findOne({ email });
    if (!mess) return res.status(404).json({ message: "Email not registered." });

    const isMatch = await bcrypt.compare(password, mess.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password." });

    const token = jwt.sign({ id: mess._id, role: mess.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.status(200).json({ token, message: "Login successful", role: mess.role });
  } catch (err) {
    console.error("Mess Login Error:", err);
    res.status(500).json({ message: "Login failed." });
  }
};

exports.sendMessResetOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    const user = await MessProvider.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not registered." });

    await sendOtp(email, otp);
    resetOtpStore[email] = otp;
    res.status(200).json({ message: "OTP sent to email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

// Reset password
exports.resetMessPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!resetOtpStore[email] || resetOtpStore[email] !== otp) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }

  try {
    const mess = await MessProvider.findOne({ email });
    if (!mess) return res.status(404).json({ message: "Email not registered." });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    mess.password = hashedPassword;
    await mess.save();

    delete resetOtpStore[email];
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reset password." });
  }
};

// Get Mess Provider Profile
// GET /api/mess/mess-profilepage
exports.getMessProfile = async (req, res) => {
  try {
    const mess = await MessProvider.findById(req.user.id).select("-password");

    if (!mess) return res.status(404).json({ message: "Mess provider not found" });

    // Assume rating & connectionCount are stored in DB
    res.json({
      fullName: mess.fullName,
      companyName: mess.companyName,
      email: mess.email,
      phone: mess.phone,
      address: mess.address,
      monthlyPrice: mess.monthlyPrice,
      averageRating: mess.averageRating || 0,
      ratingCount: mess.ratingCount || 0,
      connectionCount: mess.connectionCount || 0
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch mess profile" });
  }
};
