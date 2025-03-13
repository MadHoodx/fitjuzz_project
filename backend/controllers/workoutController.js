const workoutModel = require("../models/exerciseModel");


const workoutController = {
    updateWorkout: async (req, res) => {
        const { userId } = req.params
        const { exercises } = req.body

        try {

            if (!userId || !exercises.length) {
                return res.status(400).json({ error: "Missing userId or exercises" });
            }

            const newWorkout = new Workout({ userId, exercises });
            await newWorkout.save();

            res.status(201).json({ message: "Workout saved successfully" });
        } catch (error) {
            res.status(500).json({ error: "Error saving workout" });
        }
    }
};



module.exports = workoutController