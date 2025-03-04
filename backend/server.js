const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const userUpdate = require('./routes/userUpdate');
const otpRoute = require('./routes/otpRoute')


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
app.use('/api/user', otpRoute)










  



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
