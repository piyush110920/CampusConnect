const MessProvider = require("../models/MessProvider");
const sendOtp = require("../utils/sendOtp");
const bcrypt = require("bcryptjs");

const otpStore = {};

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
    country, pincode, password, otp
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
      password: hashedPassword
    });

    await newMess.save();
    delete otpStore[email];
    res.status(201).json({ message: "Mess Provider registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed. Try again." });
  }
};
