const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for React Native
// const crypto = require('crypto');
// const secret = crypto.randomBytes(32).toString('base64');
// console.log(secret);


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(() => console.log('MongoDb Connection Failed'));

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
    weight: {type: Number, default: '0'},
    height: {type: Number, default: '0'},
    fat: {type: Number, default: '0'}
  
});

const User = mongoose.model('User', UserSchema);

app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  console.log('Signin request received:', req.body)
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token (optional, but recommended for authentication)
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        weight: user.weight,
        height: user.height,
        fat : user.fat
      
  
        
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token, message: 'Signin successful' }); //send token and success message
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Signup Route
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Signup request received:', req.body)
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
       return  res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
   
    // const token = jwt.sign(
    //   { userId: newUser._id }, // You can just include the user ID
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1h' } // Adjust expiration as needed
    // );

    res.status(201).json({ message: 'Signup successful' });
   

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/api/users/:id/profile', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
    const userId = decodedToken.user.id;
  

    const user = await User.findById(userId).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/users/:id/weight', async (req, res) => {
  try {
    const { id } = req.params;
    const { weight } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { weight },
      { new: true } // To return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating weight:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.put('/api/users/:id/height', async (req, res) => {
  try {
    const { id } = req.params;
    const { height } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { height },
      { new: true } // To return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating height:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/users/:id/bodyfat', async (req, res)=> {
  try{
    const { id } = req.params;
    const { fat } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { fat },
      { new: true }
    )
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating bodyfat:', error);
    res.status(500).json({ message: 'Server error' });
  }
  
  
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
