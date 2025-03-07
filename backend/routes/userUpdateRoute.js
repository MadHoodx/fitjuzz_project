const express = require("express");
const router = express.Router();
const userUpdate = require("../controllers/userUpdateController");

router.put("/:id/updateWeight", userUpdate.updateWeight);
router.put("/:id/updateHeight", userUpdate.updateHeight);
router.put("/:id/updateFat", userUpdate.updateFat);

module.exports = router;
