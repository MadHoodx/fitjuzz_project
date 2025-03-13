const workourController = require('../controllers/workoutController')
const express = require("express");
const router = express.Router();

router.post("/:id/updateWorkout", workourController.updateWorkout);



module.exports = router;
