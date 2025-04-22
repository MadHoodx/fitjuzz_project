const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/userRoute");
const userUpdateRoute = require("./routes/userUpdateRoute");
const otpRoute = require("./routes/otpRoute");
const exerciseRoute = require("./routes/exerciseRoute");
const workoutRoute = require("./routes/workoutRoute");
const guideRoute = require("./routes/guideRoute");
const foodRoute = require("./routes/foodRoute");
const foodTypeRoute = require("./routes/foodTypeRoute");
const foodDirectRoute = require("./routes/foodDirectRoute");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");


  });

app.use("/api/user", userRoute, userUpdateRoute);
app.use("/api/user", otpRoute);
app.use("/api/user", exerciseRoute);
app.use("/api/user", workoutRoute);
app.use("/api/user", guideRoute);
app.use("/api/user/foods", foodRoute);
app.use("/api/user/foodtypes", foodTypeRoute);
app.use("/api/user/foodsdirect", foodDirectRoute);



const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
