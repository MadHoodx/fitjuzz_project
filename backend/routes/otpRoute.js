const express = require("express");
const router = express.Router();
const otpController = require('../controllers/otpController')

router.post("/sentOtp", otpController.sentOtp);


module.exports = router;
