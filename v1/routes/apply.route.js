const express = require("express");
const router = express.Router();


const controller = require("../controllers/apply.controller.js");


router.get("/:jobId", controller.apply) 

router.patch("/:jobId/:resumeId", controller.applyPatch) 


module.exports = router;