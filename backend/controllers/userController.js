const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
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
        const userGoogle = await userModel.findOne({
          userType: "google",
          email,
        });

        console.log(userGoogle)
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
          console.log("before saving");
          await newUser.save();
          console.log("after saving");
          const token = jwt.sign(
            { userId: newUser.id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
        
          return res.json({ token });
        }
        const token = jwt.sign(
          { userId: userGoogle.id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        return res.json({ token });
      } else if (xId) {
        const userX = await userModel.findOne({
          userType: "x",
          xId,
        });

        console.log(userX)
        if (!userX) {
          const newUser = new userModel({
            userType: "x",
            xId,
            username,
            name,
          });
          console.log("before saving");
          await newUser.save();
          console.log("after saving");
          const token = jwt.sign(
            { userId: newUser.id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          return res.json({ token });
        }
        const token = jwt.sign(
          { userId: userX.id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        return res.json({ token });
      } else {
        const user = await userModel.findOne({ userType: "normal", email });
        console.log(user)
        if (!user) {
          return res.status(400).json({
            message: "Sorry, looks like that’s the wrong email or password. ",
          });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({
            message: "Sorry, looks like that’s the wrong email or password. ",
          });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        return res.json({ token });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
  signup: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const user = await userModel.findOne({ userType: "normal", email });
      console.log(user)
      if (user) {
        return res.status(409).json({ message: "User already exist" });
      }
     
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const newUser = new userModel({
        userType: "normal",
        username,
        email,
        password: hashedPassword,
      });
          console.log('before saving new user');
         await newUser.save();
            
         console.log('after saving new user');

      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);

      return res.json({ token });
    } catch (error) {
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
