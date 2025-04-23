const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const NodeCache = require("node-cache");

require("dotenv").config();

const otpCache = new NodeCache({ stdTTL: 300 });

const generateOTP = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const otpController = {
  sentOtp: async (req, res) => {
    const { email } = req.body;

    try {
      if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
      const user = await userModel.findOne({ userType: "normal", email });

      if (!user) {
        return res.status(404).json({ error: "Email not found" });
      }

      const otp = generateOTP();

      console.log(email, otp);

      const existingOtp = otpCache.get(email);
      if (existingOtp) {
        otpCache.del(email);
        console.log("Old OTP cleared before setting new one");
      }

      otpCache.set(email, otp);
      console.log("New OTP set successfully");

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

      transporter.sendMail(mailOptions);
      console.log("sent opt successful");

      res.json({ message: "OTP sent to email" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  verifyOtp: async (req, res) => {
    const { email, otp } = req.body;

    try {
      const storedOtp = otpCache.get(email);

      // Normalize the provided otp to string
      const providedOtp = Array.isArray(otp) ? otp.join("") : otp;

      console.log(`Stored: ${storedOtp}, Provided: ${providedOtp}`);

      if (!storedOtp) {
        return res.status(400).json({ error: "No OTP found or expired" });
      }

      if (storedOtp !== providedOtp) {
        return res.status(400).json({ error: "Invalid OTP" });
      }
      otpCache.del(email);
      console.log("OTP verified and deleted");

      res.json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Failed to verify OTP" });
    }
  },

  passwordReset: async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;

    try {
      console.log("Hashing password...");
      const hashedPassword = await bcrypt.hash(password, 12);
      console.log("Hashed password:", hashedPassword);

      const user = await userModel.findOneAndUpdate(
        {email},
        { password: hashedPassword },
        { new: true }
      );

      console.log("Success");


      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = otpController;
