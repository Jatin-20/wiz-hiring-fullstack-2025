import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = (to, eventTitle, slotTime) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Booking Confirmed: ${eventTitle}`,
    text: `Your booking for "${eventTitle}" at ${new Date(slotTime).toLocaleString()} is confirmed!`,
  };

  return transporter.sendMail(mailOptions);
};

export default sendConfirmationEmail;
