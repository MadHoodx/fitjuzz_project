const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel", // Reference to User model
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Auto-save timestamp
  },
  exercises: [
    {
      name: { type: String, required: true },
      sets: [
        {
          setNumber: { type: Number, required: true },
          weight: { type: Number, required: true },
          reps: { type: Number, required: true },
          timer: { type: Number, required: true }, // Timer in seconds
        },
      ],
    },
  ],
});

const workoutModel = mongoose.model("workoutModel", workoutSchema);
module.exports = workoutModel;
