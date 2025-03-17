const workoutController = require('../controllers/workoutController')
const express = require("express");
const router = express.Router();

router.post("/:id/updateWorkout", workoutController.updateWorkout);
router.get("/:id/getExercisesHistory/", workoutController.getExercisesHistory);

module.exports = router;
