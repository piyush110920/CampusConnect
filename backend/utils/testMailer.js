require('dotenv').config({ path: '../.env' }); // 🔥 Load env from correct location

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // 👈 Make sure this prints
    pass: process.env.EMAIL_PASS,     // 👈 And this too
  },
});

async function sendTestMail() {
  try {
    console.log("🟡 Email user:", process.env.EMAIL_USER);
    console.log("🟡 Email pass:", process.env.EMAIL_PASS ? "✅ Loaded" : "❌ NOT loaded");

    const info = await transporter.sendMail({
      from: `"CampusConnect" <${process.env.EMAIL_USER}>`,
      to: "piyushjharariya11@gmail.com", // replace with your test email
      subject: "Testing Nodemailer",
      text: "If you're seeing this, it works!",
    });

    console.log("✅ Test email sent:", info.response);
  } catch (error) {
    console.error("🛑 Mailer Test Error:", error);
  }
}

sendTestMail();
