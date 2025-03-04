const nodemailer = require("nodemailer");
require("dotenv").config();
const NodeCache = require("node-cache");

const otpCache = new NodeCache({ stdTTL: 300 });

const generateOTP = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

const otpController = {
  sentOtp: (async = (req, res) => {
    const { email } = req.body;

    try {
      const otp = generateOTP();
      otpCache.set(email, otp);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP",
        text: `Your OTP is: ${otp}`,
      };
     
        transporter.sendMail(mailOptions)
         

      res.json({ message: "OTP sent to email" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }),
};

module.exports = otpController;
