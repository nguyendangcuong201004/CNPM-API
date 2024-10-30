const express = require("express");
const router = express.Router();


const controller = require("../controllers/recruiter.controller.js");
const validate = require("../../validates/recruiter.validate.js")
const authMiddleware = require("../../middlewares/auth.middleware.js");

router.get("/", controller.index)

router.post("/register", validate.recruiterCheck, controller.register)

router.post("/login", controller.login)

router.post("/password/forgot", controller.passwordForgot) 

router.post("/password/otp", controller.passwordOtp) 

router.post("/password/reset", controller.passwordReset) 

router.get("/detail/:token", authMiddleware.requireAuth, controller.detail) 


module.exports = router;