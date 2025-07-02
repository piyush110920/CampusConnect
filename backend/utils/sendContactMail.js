const nodemailer = require('nodemailer');

const sendContactMail = async (name, email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,       // e.g., "studenthelp@gmail.com"
      pass: process.env.EMAIL_PASS,  // App password, not Gmail password
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Contact Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendContactMail;
