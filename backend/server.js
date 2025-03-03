const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const userUpdate = require('./routes/userUpdate');
const userController = require('./controllers/userController');


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



app.use('/api/user', userRoute,userUpdate)











  



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
