import express from "express";
import nodemailer from "nodemailer";

// with mongodb
const node_email = express.Router();
node_email.post(`/send_email`, async (req, res) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_EMAIL,
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: "tr.trungnghia2001@gmail.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
      html: "<h1>Welcome</h1><p>That was easy!</p>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return res
      .status(200)
      .json({ status: 200, message: "Send email successfully" });
  } catch (error) {
    console.log(error);
  }
});
export default node_email;
