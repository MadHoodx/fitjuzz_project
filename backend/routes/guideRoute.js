const guideController = require('../controllers/guideController')
const express = require("express");
const router = express.Router();

router.get("/getSteroidDetails", guideController.getSteroidDetails);



module.exports = router;
