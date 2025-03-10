const exerciseController = require('../controllers/exerciseController')
const express = require("express");
const router = express.Router();

router.get("/getExercises", exerciseController.exercises);



module.exports = router;
