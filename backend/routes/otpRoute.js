const express = require("express");
const router = express.Router();
const otpController = require('../controllers/otpController')

router.post("/sentOtp", otpController.sentOtp);
router.post("/verifyOtp", otpController.verifyOtp)
router.put("/passwordReset", otpController.passwordReset)


module.exports = router;
