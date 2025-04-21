const workoutController = require('../controllers/workoutController')
const express = require("express");
const router = express.Router();

router.post("/:userId/updateWorkout", workoutController.updateWorkout);
router.get("/:userId/getExercisesHistory/", workoutController.getExercisesHistory);

module.exports = router;
