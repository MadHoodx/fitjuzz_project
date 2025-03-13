const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const userUpdateRoute = require('./routes/userUpdateRoute');
const otpRoute = require('./routes/otpRoute')
const exerciseRoute = require('./routes/exerciseRoute')
const workoutRoute = require('./routes/workoutRoute')
const app = express();
app.use(express.json());
app.use(cors()); 

const exerciseModel = require('./models/exerciseModel')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');

  // Array of 10 exercises
  const exercises = [
      { name: 'Push-up', description: 'A bodyweight exercise for chest and arms.', category: 'chest' },
      { name: 'Pull-up', description: 'A bodyweight exercise for the back.', category: 'back' },
      { name: 'Bicep Curl', description: 'An exercise for strengthening the arms.', category: 'arms' },
      { name: 'Sit-up', description: 'A core exercise for the abs.', category: 'abs' },
      { name: 'Squat', description: 'A lower body exercise for legs and glutes.', category: 'leg' },
      { name: 'Bench Press', description: 'A strength exercise for the chest and triceps.', category: 'chest' },
      { name: 'Deadlift', description: 'A compound exercise for the back and legs.', category: 'back' },
      { name: 'Tricep Dip', description: 'An exercise for triceps.', category: 'arms' },
      { name: 'Leg Press', description: 'A machine-based leg exercise for quads and glutes.', category: 'leg' },
      { name: 'Plank', description: 'A core strengthening exercise for abs and lower back.', category: 'abs' },
      { name: 'Fly', description: 'A chest exercise for middle and inner chest', category: 'chest' }
  ];


  // return exerciseModel.insertMany(exercises);
})


app.use('/api/user', userRoute,userUpdateRoute)
app.use('/api/user', otpRoute)
app.use('/api/user', exerciseRoute)
app.use('/api/user', workoutRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
