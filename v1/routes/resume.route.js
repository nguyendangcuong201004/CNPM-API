const express = require("express");
const router = express.Router();


const controller = require("../controllers/resume.controller");
const resumeValidate = require("../../validates/resume.validate.js");


router.get("/", controller.index) 

router.get("/detail/:id", controller.detail)

router.post("/create" , resumeValidate.createPost ,controller.create)

router.patch("/edit/:id" ,controller.edit) 

router.delete("/delete/:id" ,controller.delete) 


module.exports = router;