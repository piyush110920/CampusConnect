// backend/utils/sendOtp.js
const nodemailer = require("nodemailer");

const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"CampusConnect" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your CampusConnect OTP",
    text: `Your OTP for CampusConnect registration is: ${otp}`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOtp;
