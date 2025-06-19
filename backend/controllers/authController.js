const nodemailer = require('nodemailer');

const otpStore = new Map(); // In-memory store

exports.generateOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpStore.set(email, { otp, expiresAt });

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"CampusConnect OTP" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP Code',
    text: `Your CampusConnect OTP is: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'OTP sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send OTP', error });
  }
};

exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore.get(email);

  if (!record) {
    return res.status(400).json({ success: false, message: 'OTP not found. Please generate again.' });
  }

  const { otp: storedOtp, expiresAt } = record;

  if (Date.now() > expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ success: false, message: 'OTP expired. Please generate again.' });
  }

  if (otp !== storedOtp) {
    return res.status(400).json({ success: false, message: 'Incorrect OTP.' });
  }

  otpStore.delete(email);
  return res.status(200).json({ success: true, message: 'OTP verified!' });
};
