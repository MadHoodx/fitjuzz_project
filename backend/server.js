const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const userUpdate = require('./routes/userUpdate');


const app = express();
app.use(express.json());
app.use(cors()); 



// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(() => console.log('MongoDb Connection Failed'));



app.use('/api/user', userRoute)
app.use('/api/user', userUpdate)









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
