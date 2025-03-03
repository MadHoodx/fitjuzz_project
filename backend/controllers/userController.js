const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
  signin: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if user exists
      const checkUser = await user.findOne({ email });
      if (!checkUser) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, checkUser.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create JWT token (optional, but recommended for authentication)
      const payload = {
        user: {
          id: user.id,
          username: user.username,
          weight: user.weight,
          height: user.height,
          fat: user.fat,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" }, // Token expires in 1 hour
        (err, token) => {
          if (err) throw err;
          res.json({ token, message: "Signin successful" }); //send token and success message
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  signup: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const checkUser = await user.findOne({ $or: [{ username }, { email }] });

      if (checkUser) {
        return res.status(200).json({ message: "User already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = new user({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      const payload = {
        user: {
          id: newUser.id,
          username: newUser.username,
          weight: newUser.weight,
          height: newUser.height,
          fat: newUser.fat,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" }, // Token expires in 1 hour
        (err, token) => {
          if (err) throw err;
          res.json({ token, message: "Signup successful" }); //send token and success message
        }
      );


    } catch (error) {
      return error;
    }
  },
  profile: async (req, res) => {
    try {

        
      
     
  
      const user = await user.findById(req.params.id).select('-password'); // Exclude password from response
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
};

module.exports = userController;

