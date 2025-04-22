const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userController = {
  signin: async (req, res) => {
    const {
      xId,
      username,
      googleId,
      name,
      givenName,
      familyName,
      email,
      picture,
      password,
    } = req.body;
  
    try {
      if (googleId) {
        // Google Sign-In
        const userGoogle = await userModel.findOne({
          userType: "google",
          email,
        });
  
        if (!userGoogle) {
          const newUser = new userModel({
            userType: "google",
            googleId,
            name,
            givenName,
            familyName,
            email,
            picture,
          });
          await newUser.save();
  
          const token = jwt.sign(
            { userId: newUser.id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
          );
          return res.json({ token });
        }
  
        const token = jwt.sign(
          { userId: userGoogle.id },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        return res.json({ token });
  
      } else if (xId) {
        // X Platform Sign-In
        const userX = await userModel.findOne({
          userType: "x",
          xId,
        });
  
        if (!userX) {
          const newUser = new userModel({
            userType: "x",
            xId,
            username,
            name,
          });
          await newUser.save();
  
          const token = jwt.sign(
            { userId: newUser.id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
          );
          return res.json({ token });
        }
  
        const token = jwt.sign(
          { userId: userX.id },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        return res.json({ token });
  
      } else {
        // Normal Sign-In (email/password)
        const user = await userModel.findOne({ userType: "normal", email });
  
        if (!user) {
          return res.status(400).json({
            message: "Invalid email or password.",
          });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({
            message: "Invalid email or password.",
          });
        }
  
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        return res.json({ token });
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  signup: async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const user = await userModel.findOne({ userType: "normal", email });
  
      if (user) {
        return res.status(409).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const newUser = new userModel({
        userType: "normal",
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      const token = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );
  
      return res.json({ token });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  profile: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await userModel.findById(userId).select("-password");

      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = userController;
