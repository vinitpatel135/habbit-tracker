const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can use other services like Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER || 'kanjiyaparas2002@gmail.com',
    pass: process.env.EMAIL_PASS || 'ytte pdom dpfb wwqw',
  },
});

const sendReminderEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'kanjiyaparas2002@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Error sending email: ${error}`);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = sendReminderEmail;
