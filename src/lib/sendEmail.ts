import nodemailer from "nodemailer";
const sendEmail = async (email: string, emailHTML: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // If using Gmail
    auth: {
      user: process.env.EMAIL_USERNAME, // Your Gmail address or email
      pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password (if using Gmail)
    },
  });

  const mailOptions = {
    from: `Rate Flow <${process.env.EMAIL_USERNAME}>`, // Sender address
    to: email, // Recipient's email
    subject: "Welcome to Rate Flow API", // Subject of the email
    html: emailHTML, // HTML content
  };
  transporter.sendMail(mailOptions);
};

export default sendEmail;
