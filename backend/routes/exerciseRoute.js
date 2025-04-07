const exerciseController = require('../controllers/exerciseController');
const exerciseDetailController = require('../controllers/exerciseDetailController');
const express = require("express");
const router = express.Router();

router.get("/getExercises", exerciseController.exercises);

router.get('/getExerciseDetails/:id', exerciseDetailController.getExerciseDetails);

module.exports = router;
