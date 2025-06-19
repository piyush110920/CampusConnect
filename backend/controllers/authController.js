const User = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

exports.generateOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, otp, otpExpiry });
    } else {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
    }

    await user.save();

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        EMAIL_USER: 'your_email@gmail.com',
        EMAIL_PASS: 'your_email_app_password', // App password, not real password
      },
    });

    await transporter.sendMail({
      from: '"CampusConnect" <your_email@gmail.com>',
      to: email,
      subject: 'Your OTP for CampusConnect Signup',
      text: `Your OTP is: ${otp}`,
    });

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({ message: 'Error generating OTP. Please try again later.' });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, otp, role } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.name = name;
    user.password = hashedPassword;
    user.role = role;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error during signup. Please try again.' });
  }
};
