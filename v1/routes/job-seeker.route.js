const express = require("express");
const router = express.Router();


const controller = require("../controllers/job-seeker.controller.js");
const validate = require("../../validates/job-seeker.validate")
const authMiddleware = require("../../middlewares/auth.middleware.js");

router.get("/", controller.index)

router.post("/register", validate.jobSeekerCheck,controller.register)

router.post("/login", controller.login)

router.post("/password/forgot", controller.passwordForgot) 

router.post("/password/otp", controller.passwordOtp) 

router.post("/password/reset", controller.passwordReset) 

router.get("/detail/:token", authMiddleware.requireAuth, controller.detail) 


module.exports = router;