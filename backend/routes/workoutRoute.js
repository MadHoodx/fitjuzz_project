const workoutController = require('../controllers/workoutController')
const express = require("express");
const router = express.Router();

router.post("/:id/updateWorkout", workoutController.updateWorkout);



module.exports = router;
