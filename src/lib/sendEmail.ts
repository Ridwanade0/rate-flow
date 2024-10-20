import nodemailer from "nodemailer";
import "dotenv/config"; // Import environment variables

const sendEmail = async (email: string, subject: string, text: string) => {
  // Create a transporter object with SMTP server details
  const transporter = nodemailer.createTransport({
    service: "gmail", // If using Gmail
    auth: {
      user: process.env.EMAIL_USERNAME, // Your Gmail address or email
      pass: process.env.MAIL_PASSWORD, // Your email password or app-specific password (if using Gmail)
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USERNAME, // Sender address
    to: email, // Recipient's email
    subject: subject, // Email subject
    text: text, // Plain text body of the email
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export default sendEmail;
