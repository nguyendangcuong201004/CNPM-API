const Job = require("../models/job.model");
const Resume = require("../models/resume.model");


// [GET] /api/v1/apply

module.exports.index = async (req, res) => {


    const find = {};

    if (req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
    }

    const pagination = {
        limit: 5,
        page: 1
    }

    if (req.query.page && req.query.page > 0){
        pagination.page = parseInt(req.query.page)
    }

    if (req.query.limit){
        pagination.limit = parseInt(req.query.limit)
    }

    const skip = pagination.limit * (pagination.page - 1);

    const jobs = await Job.find(find).limit(pagination.limit).skip(skip);
    
    res.json({
        code: 200,
        jobs: jobs
    })
}

// [GET] /api/v1/apply/getJob/:jobID
module.exports.apply = async (req, res) => {
    const job = await Job.findOne({
        _id: req.params.jobId
    })

    res.json({
        code: 200,
        job: job
    })
}


// [GET] /api/v1/apply/pick/:jobID 
module.exports.pickJob = async (req, res) => {

    const jobSeekerId = res.locals.jobSeeker.id;

    const resumes = await Resume.find({
        jobSeekerID: jobSeekerId
    })

    res.json({
        code: 200,
        resumes: resumes
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