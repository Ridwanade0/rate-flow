import nodemailer from "nodemailer";

const sendEmail = async (
  email: string,
  emailTitle: string,
  emailHTML: string,
  text: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // If using Gmail
    auth: {
      user: process.env.EMAIL_USERNAME, // Your Gmail address
      pass: process.env.EMAIL_PASSWORD, // Your email password or app password (for Gmail)
    },
  });

  const mailOptions = {
    from: `Rate Flow <${process.env.EMAIL_USERNAME}>`, // Sender address
    to: email, // Recipient's email
    subject: emailTitle, // Subject of the email
    html: emailHTML || undefined, // HTML content if provided
    text: emailHTML ? undefined : text, // Plain text as fallback if no HTML
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

export default sendEmail;
