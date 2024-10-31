const Resume = require("../models/resume.model")

// [GET] /api/v1/resumes
module.exports.index = async (req, res) => {

    const jobSeekerId = res.locals.jobSeeker.id;

    const resumes = await Resume.find({
        jobSeekerID: jobSeekerId
    })

    if (!resumes){
        res.json({
            code: 200,
            message: "Bạn chưa có bất kỳ resume nào"
        })
    }

    else {
        res.json({
            code: 200,
            message: "Đây là các resume của bạn",
            resumes: resumes,
        })
    }
}

// [GET] /api/v1/resumes/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const resume = await Resume.findOne({
        _id: id,
    })
    res.json(resume)
}

// [POST] /api/v1/resumes/create
module.exports.create = async (req, res) => {

    req.body.jobSeekerID = res.locals.jobSeeker.id;
    const resume = new Resume(req.body);
    await resume.save();

    res.json({
        code: 200,
        message: "Thêm mới resume thành công!"
    })
}

// [PATCH] /api/v1/resumes/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    
    await Resume.updateOne({
        _id: id
    }, req.body);

    res.json({
        code: 200,
        message: "Cập nhật công việc thành công!"
    })
}

// [DELETE] /api/v1/resumes/delete/:id
module.exports.delete = async (req, res) => {

    const id = req.params.id;

    await Resume.deleteOne({
        _id: id,
    })

    res.json({
        code: 200,
        message: "Xóa công việc thành công!"
    })
}