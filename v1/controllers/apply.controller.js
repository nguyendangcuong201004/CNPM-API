const Job = require("../models/job.model");
const Resume = require("../models/resume.model");

// [GET] /api/v1/apply/:jobID
module.exports.apply = async (req, res) => {
    const jobSeekerId = res.locals.jobSeeker.id;

    const resumes = await Resume.find({
        jobSeekerID: jobSeekerId
    })

    res.json({
        code: 200,
        resumes: resumes,
    })
}

// [PATCH] /api/v1/apply/:jobID/:resumeId
module.exports.applyPatch = async (req, res) => {
    const jobId = req.params.jobId;
    const resumeId = req.params.resumeId;

    const resume = await Resume.findOne({
        _id: resumeId
    })

    await Job.updateOne({
        _id: jobId
    }, {
        $push: { resumes: resume }
    })

    const job = await Job.findOne({
        _id: jobId
    })

    res.json({
        code: 200,
        job: job
    })
}