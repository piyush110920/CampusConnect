const Student = require('../models/Student');
const { sendOtp, verifyOtp } = require('../utils/sendOtp');

exports.generateStudentOtp = async (req, res) => {
  const { email } = req.body;
  try {
    await sendOtp(email);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
+   console.error('🛑 OTP Error:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

exports.registerStudent = async (req, res) => {
  const {
    fullName, email, password, confirmPassword, college,
    plotNumber, landmark, area, city, state, country, pinCode, otp
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  if (!verifyOtp(email, otp)) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  try {
    const student = new Student({
      fullName,
      email,
      password, // NOTE: Ideally hash this before saving!
      college,
      address: { plotNumber, landmark, area, city, state, country, pinCode },
      role: 'student'
    });

    await student.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed' });
  }
};
