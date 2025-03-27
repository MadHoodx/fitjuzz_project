const express = require("express");
const router = express.Router();
const userUpdateController = require("../controllers/userUpdateController");

router.put("/:id/updateWeight", userUpdateController.updateWeight);
router.put("/:id/updateHeight", userUpdateController.updateHeight);
router.put("/:id/updateFat", userUpdateController.updateFat);
router.put("/:id/updateMuscle", userUpdateController.updateMuscle);
router.put("/:id/updatePicture", userUpdateController.updatePicture)
module.exports = router;
