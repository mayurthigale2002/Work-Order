const nodemailer = require("nodemailer");

const sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_email@gmail.com",
        pass: "your_app_password" // NOT normal password
      }
    });

    await transporter.sendMail({
      from: "Work Order System <your_email@gmail.com>",
      to,
      subject,
      html
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email Error:", error);
  }
};

module.exports = sendMail;