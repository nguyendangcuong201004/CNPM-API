const express = require("express");
const router = express.Router();


const controller = require("../controllers/job.controller.js");
const jobValidate = require("../../validates/job.validate.js");


router.get("/", controller.index) 

router.get("/detail/:id", controller.detail)

router.post("/create", jobValidate.createPost ,controller.create)

router.patch("/edit/:id" ,controller.edit) 

router.delete("/delete/:id" ,controller.delete) 

router.patch("/review/:resumeId" ,controller.review) 


module.exports = router;