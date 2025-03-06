const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
router.post("/signinGoogle", userController.signinGoogle);
router.get("/:id/profile", userController.profile);
router.get("/:id/profileGoogle", userController.profileGoogle);

module.exports = router;
