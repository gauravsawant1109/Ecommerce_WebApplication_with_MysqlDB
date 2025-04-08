const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password' // Use an App Password if using Gmail
  }
});

const sendResetEmail = (email, token) => {
  const resetLink = `http://yourfrontend.com/reset-password?token=${token}`;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;
