const mongoose = require("mongoose");

const SetSchema = new mongoose.Schema({
  setNumber: { type: Number, required: true },
  weight: { type: Number, required: true },
  reps: { type: Number, required: true },
  timer: { type: Number, required: true }
});

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: [SetSchema], // Array of sets
});

const WorkoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel", // <-- Make sure it matches your user model name
    required: true,
  },
  exercises: [ExerciseSchema], // Array of exercises
  date: { type: Date, default: Date.now },
});

const workoutModel = mongoose.model("workoutModel", WorkoutSchema);
module.exports = workoutModel;
