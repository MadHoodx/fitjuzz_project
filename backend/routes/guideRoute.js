const guideController = require('../controllers/guideController')
const express = require("express");
const router = express.Router();

router.get("/getSteroidDetails", guideController.getSteroidDetails);
router.get("/getSupplementDetails", guideController.getSupplementDetails    );
router.get("/getEncyclopediaDetails", guideController.getEncyclopediaDetails    );

module.exports = router;
