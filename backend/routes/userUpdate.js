const express = require("express");
const router = express.Router();
const userUpdate = require("../controllers/userUpdate");

router.put("/:id/updateWeight", userUpdate.updateWeight);
router.put("/:id/updateHeight", userUpdate.updateHeight);
router.put("/:id/updateFat", userUpdate.updateFat);
router.put("/:id/updateWeightGoogle", userUpdate.updateWeightGoogle);
module.exports = router;
