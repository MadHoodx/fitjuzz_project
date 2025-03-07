const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
  signin: async (req, res) => {
    // const { email, password } = req.body;
    const { googleId, name, givenName, familyName, email, picture, password } =
      req.body;
    try {
      if (email && password) {
        const user = await userModel.findOne({ userType: "normal", email });

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
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.json({ token });
      } else if (googleId) {
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
            {
              expiresIn: "1h",
            }
          );
          return res.json({ token });
        }
        const token = jwt.sign({ userId: userGoogle.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.json({ token });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
  signup: async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    try {
      const user = await userModel.findOne({ userType: "normal", email });

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

      await newUser.save();

      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
  profile: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await userModel.findById(userId).select("-password");
      // const userGoogle = await userGoogleModel.findById(userId);

      if (user) {
        res.json(user);
      }
      // else if (userGoogle) {
      //   res.json(userGoogle);
      // }
      else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
  signinGoogle: async (req, res) => {
    const { googleId, name, givenName, familyName, email, picture } = req.body;
    try {
      const user = await userModel.findOne({ userType: "google", email });

      if (!user) {
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

        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.json({ token });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
  // profileGoogle: async (req, res) => {
  //   const userId = req.params.id;

  //   try {
  //     const user = await userGoogleModel.findById(userId);
  //     console.log(user)
  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     res.json(user);
  //   } catch (error) {
  //     res.status(500).json({ message: "Server error" });
  //   }
  // },
};

module.exports = userController;
