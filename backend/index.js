const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const userUpdateRoute = require('./routes/userUpdateRoute');
const otpRoute = require('./routes/otpRoute')
const exerciseRoute = require('./routes/exerciseRoute')
const workoutRoute = require('./routes/workoutRoute')
const guideRoute = require('./routes/guideRoute')
const app = express();
app.use(express.json());
app.use(cors()); 

const exerciseModel = require('./models/exerciseModel')
const steroidDetail = require('./models/steroidDetail')

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

  

  // process to delete all data and insert new data
  exerciseModel.deleteMany({})
    .then(result => {
      console.log(`delete all data ${result.deletedCount} data`);
      return exerciseModel.insertMany(exercises);
    })
    .then(result => {
      console.log(`insert new data ${result.length} data`);
    })
    .catch(err => {
      console.error('error in data management:', err);
    });


    const steroidDetails = [
      { 
        name: 'Testosterone Enanthate', 
        description: 'A popular anabolic steroid for muscle building.',
        category: 'anabolic',
        picture: 'https://example.com/testosterone.jpg',
        steps: [
          'Follow the prescribed dosage.',
          'Use as directed by a healthcare provider.',
          'Monitor side effects regularly.'
        ],
        sideEffect: 'Possible side effects include acne, hair loss, and aggression.',
        tips: 'Consult a doctor before using testosterone.'
      },
      { 
        name: 'Dianabol', 
        description: 'A potent oral steroid for rapid muscle gains.',
        category: 'oral',
        picture: 'https://example.com/dianabol.jpg',
        steps: [
          'Take as per the prescribed dosage.',
          'Ensure proper nutrition and hydration.',
          'Avoid exceeding recommended dosages.'
        ],
        sideEffect: 'Side effects may include liver damage and high blood pressure.',
        tips: 'Do not use for extended periods.'
      },
      { 
        name: 'Deca Durabolin', 
        description: 'An anabolic steroid that promotes muscle growth and recovery.',
        category: 'anabolic',
        picture: 'https://example.com/deca.jpg',
        steps: [
          'Administer through injection as per prescribed schedule.',
          'Consult with a healthcare provider for dosage recommendations.',
          'Regularly monitor health parameters during use.'
        ],
        sideEffect: 'Can cause joint pain, water retention, and hormonal imbalance.',
        tips: 'Best used under professional supervision.'
      },
      { 
        name: 'Winstrol', 
        description: 'A steroid used for cutting cycles and fat loss.',
        category: 'oral',
        picture: 'https://example.com/winstrol.jpg',
        steps: [
          'Take as directed with meals to reduce stomach discomfort.',
          'Track progress regularly and stop if adverse effects occur.'
        ],
        sideEffect: 'Can lead to liver toxicity and cardiovascular issues.',
        tips: 'Use only for short cycles and under medical guidance.'
      },
      { 
        name: 'Trenbolone', 
        description: 'A very powerful anabolic steroid known for rapid muscle gain.',
        category: 'injectable',
        picture: 'https://example.com/trenbolone.jpg',
        steps: [
          'Administer through injection as prescribed by a doctor.',
          'Monitor for severe side effects such as anxiety and aggression.'
        ],
        sideEffect: 'Severe side effects can include anxiety, aggression, and hair loss.',
        tips: 'Not recommended for beginners.'
      }
    ];
    
    // Process to delete all data and insert new data for steroids
    steroidDetail.deleteMany({})
      .then(result => {
        console.log(`Deleted all existing steroid data. ${result.deletedCount} records removed.`);
        return steroidDetail.insertMany(steroidDetails);
      })
      .then(result => {
        console.log(`Inserted new steroid data. ${result.length} records added.`);
      })
      .catch(err => {
        console.error('Error in managing steroid data:', err);
      });
})
.catch(err => {
  console.error('error in connection to MongoDB:', err);
});


app.use('/api/user', userRoute,userUpdateRoute)
app.use('/api/user', otpRoute)
app.use('/api/user', exerciseRoute)
app.use('/api/user', workoutRoute)
app.use('/api/user', guideRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
