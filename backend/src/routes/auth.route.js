const express = require("express")
const router = express.Router();

const authController = require("../controller/auth.controller.js")

router.post("/signup",authController.signUp)
router.post("/signin",authController.login)

module.exports = router;