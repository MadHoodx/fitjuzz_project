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

  //   // Array of 10 exercises
  //   const exercises = [
  //     {
  //       name: "Push-up",
  //       description: "A bodyweight exercise for chest and arms.",
  //       category: "chest",
  //     },
  //     {
  //       name: "Pull-up",
  //       description: "A bodyweight exercise for the back.",
  //       category: "back",
  //     },
  //     {
  //       name: "Bicep Curl",
  //       description: "An exercise for strengthening the arms.",
  //       category: "arms",
  //     },
  //     {
  //       name: "Sit-up",
  //       description: "A core exercise for the abs.",
  //       category: "abs",
  //     },
  //     {
  //       name: "Squat",
  //       description: "A lower body exercise for legs and glutes.",
  //       category: "leg",
  //     },
  //     {
  //       name: "Bench Press",
  //       description: "A strength exercise for the chest and triceps.",
  //       category: "chest",
  //     },
  //     {
  //       name: "Deadlift",
  //       description: "A compound exercise for the back and legs.",
  //       category: "back",
  //     },
  //     {
  //       name: "Tricep Dip",
  //       description: "An exercise for triceps.",
  //       category: "arms",
  //     },
  //     {
  //       name: "Leg Press",
  //       description: "A machine-based leg exercise for quads and glutes.",
  //       category: "leg",
  //     },
  //     {
  //       name: "Plank",
  //       description: "A core strengthening exercise for abs and lower back.",
  //       category: "abs",
  //     },
  //     {
  //       name: "Fly",
  //       description: "A chest exercise for middle and inner chest",
  //       category: "chest",
  //     },
  //   ];

  //   // process to delete all data and insert new data
  //   exerciseModel
  //     .deleteMany({})
  //     .then((result) => {
  //       console.log(`delete all data ${result.deletedCount} data`);
  //       return exerciseModel.insertMany(exercises);
  //     })
  //     .then((result) => {
  //       console.log(`insert new data ${result.length} data`);
  //     })
  //     .catch((err) => {
  //       console.error("error in data management:", err);
  //     });

  //   const steroidDetails = [
  //     {
  //       name: "Testosterone Enanthate",
  //       description:
  //         "Testosterone Enanthate is a long-acting anabolic steroid primarily used in hormone therapy for men with low testosterone levels. It promotes significant muscle mass gain, strength, and endurance when combined with resistance training. Often favored by bodybuilders during bulking cycles, it also enhances recovery and overall physical performance.",
  //       category: "anabolic",
  //       picture: "https://example.com/testosterone.jpg",
  //     },
  //     {
  //       name: "Dianabol",
  //       description:
  //         "Dianabol, also known as Methandrostenolone, is a fast-acting oral steroid that significantly boosts muscle growth and strength in a short period. It is commonly used in bulking phases due to its powerful anabolic effects, making it a favorite among athletes looking for rapid physical transformation.",
  //       category: "oral",
  //       picture: "https://example.com/dianabol.jpg",
  //     },
  //     {
  //       name: "Deca Durabolin",
  //       description:
  //         "Deca Durabolin (Nandrolone Decanoate) is a well-known anabolic steroid valued for its ability to enhance muscle recovery, joint health, and lean muscle mass. It has mild androgenic properties, making it suitable for longer cycles with minimal estrogenic side effects compared to other steroids.",
  //       category: "anabolic",
  //       picture: "https://example.com/deca.jpg",
  //     },
  //     {
  //       name: "Winstrol",
  //       description:
  //         "Winstrol (Stanozolol) is a popular oral steroid used during cutting phases to preserve lean muscle mass while promoting fat loss and muscle definition. Athletes and bodybuilders often use Winstrol to improve vascularity, hardness, and athletic performance without significant water retention.",
  //       category: "oral",
  //       picture: "https://example.com/winstrol.jpg",
  //     },
  //     {
  //       name: "Trenbolone",
  //       description:
  //         "Trenbolone is one of the most powerful injectable anabolic steroids known for its rapid muscle gain, fat-burning capabilities, and increased strength. It is not recommended for beginners due to its intensity and potential side effects, but it remains a top choice for advanced users during both bulking and cutting cycles.",
  //       category: "injectable",
  //       picture: "https://example.com/trenbolone.jpg",
  //     },
  //   ];

  //   // Process to delete all data and insert new data for steroids
  //   steroidDetailModel
  //     .deleteMany({})
  //     .then((result) => {
  //       console.log(
  //         `Deleted all existing steroid data. ${result.deletedCount} records removed.`
  //       );
  //       return steroidDetailModel.insertMany(steroidDetails);
  //     })
  //     .then((result) => {
  //       console.log(
  //         `Inserted new steroid data. ${result.length} records added.`
  //       );
  //     })
  //     .catch((err) => {
  //       console.error("Error in managing steroid data:", err);
  //     });

  //   const supplements = [
  //     {
  //       name: "Whey Protein",
  //       description:
  //         "A fast-digesting protein ideal for post-workout recovery.",
  //       category: "protein",
  //     },
  //     {
  //       name: "Creatine Monohydrate",
  //       description:
  //         "Helps increase strength and muscle mass by replenishing ATP stores.",
  //       category: "creatine",
  //     },

  //     {
  //       name: "BCAA",
  //       description:
  //         "Supports muscle recovery, reduces soreness, and prevents muscle breakdown.",
  //       category: "bcaa",
  //     },
  //     {
  //       name: "Casein Protein",
  //       description:
  //         "A slow-digesting protein great for overnight muscle repair.",
  //       category: "protein",
  //     },
  //   ];

  //   // Delete all and insert new supplements
  //   supplementDetailModel
  //     .deleteMany({})
  //     .then((result) => {
  //       console.log(`Deleted ${result.deletedCount} existing supplements`);
  //       return supplementDetailModel.insertMany(supplements);
  //     })
  //     .then((result) => {
  //       console.log(`Inserted ${result.length} new supplements`);
  //     })
  //     .catch((err) => {
  //       console.error("Error managing supplement data:", err);
  //     });

  //   const fitnessEntries = [
  //     {
  //       name: "Hypertrophy",
  //       description:
  //         "The enlargement of an organ or tissue from the increase in size of its cells, especially muscle fibers due to resistance training.",
  //     },
  //     {
  //       name: "VO2 Max",
  //       description:
  //         "The maximum rate of oxygen consumption measured during incremental exercise; a common indicator of cardiovascular fitness.",
  //     },
  //     {
  //       name: "Progressive Overload",
  //       description:
  //         "The gradual increase of stress placed upon the body during exercise training, which is essential for muscle growth.",
  //     },
  //     {
  //       name: "Resting Heart Rate",
  //       description:
  //         "The number of heartbeats per minute while at complete rest; a lower value typically indicates better cardiovascular fitness.",
  //     },
  //     {
  //       name: "DOMS (Delayed Onset Muscle Soreness)",
  //       description:
  //         "Muscle pain and stiffness that occurs hours to days after unaccustomed or strenuous exercise.",
  //     },
  //   ];

  //   // Delete all and insert new entries
  //   encyclopediaDetailModel
  //     .deleteMany({})
  //     .then((result) => {
  //       console.log(
  //         `Deleted ${result.deletedCount} existing encyclopedia entries`
  //       );
  //       return encyclopediaDetailModel.insertMany(fitnessEntries);
  //     })
  //     .then((result) => {
  //       console.log(`Inserted ${result.length} new encyclopedia entries`);
  //     })
  //     .catch((err) => {
  //       console.error("Error managing fitness encyclopedia data:", err);
  //     });
  // })
  // .catch((err) => {
  //   console.error("error in connection to MongoDB:", err);
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
