const exerciseController = require('../controllers/workourController')
const express = require("express");
const router = express.Router();

router.post("/updateWorkout", workourController.updateWorkout);



module.exports = router;
