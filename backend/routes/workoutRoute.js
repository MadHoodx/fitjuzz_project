const workourController = require('../controllers/workoutController')
const express = require("express");
const router = express.Router();

router.post("/updateWorkout", workourController.updateWorkout);



module.exports = router;
