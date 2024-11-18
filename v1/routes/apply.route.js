const express = require("express");
const router = express.Router();


const controller = require("../controllers/apply.controller.js");



router.get("/", controller.index)

router.get("/getJob/:jobId", controller.apply) 

router.get("/pick/:jobId", controller.pickJob) 

router.patch("/:jobId/:resumeId", controller.applyPatch) 


module.exports = router;