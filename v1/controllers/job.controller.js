const Job = require("../models/job.model");
const Resume = require("../models/resume.model");


// [POST] /api/v1/jobs/create
module.exports.create = async (req, res) => {

    req.body.recruiterId = res.locals.recruiter.id;
    const job = new Job(req.body);
    await job.save();

    res.json({
        code: 200,
        message: "Thêm mới bản tin tuyển dụng thành công!"
    })
    
}


// [GET] /api/v1/jobs
module.exports.index = async (req, res) => {
    const recruiterId = res.locals.recruiter.id;

    const jobs = await Job.find({
        recruiterId: recruiterId
    })

    res.json({
        code: 200,
        message: "Lấy bản tin tuyển dụng thành công!",
        jobs: jobs
    })
    
}

// [GET] /api/v1/jobs/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const job = await Job.findOne({
        _id: id,
    })
    res.json(job)
}

// [PATCH] /api/v1/jobs/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    
    await Job.updateOne({
        _id: id
    }, req.body);

    res.json({
        code: 200,
        message: "Cập nhật bản tin thành công!"
    })
}

// [DELETE] /api/v1/tasks/delete/:id
module.exports.delete = async (req, res) => {

    const id = req.params.id;

    await Job.deleteOne({
        _id: id,
    })

    res.json({
        code: 200,
        message: "Xóa bản tin thành công!"
    })
}

// [PATCH] /api/v1/jobs/review/:resumeId
module.exports.review = async (req, res) => {
    const resumeId = req.params.resumeId;

    await Resume.updateOne({
        _id: resumeId
    }, {
        status: "accept"
    })

    const resume = await Resume.findOne({
        _id: resumeId,
    })

    res.json({
        code: 200,
        message: "Cập nhật bản tin thành công!",
        resume: resume
    })
}