const JobSeeker = require("../v1/models/job-seeker.model");
const Recruiter = require("../v1/models/recruiter.model.js")

module.exports.requireAuth = async (req, res, next) => {

    if (!req.headers.authorization) {
        res.json({
            code: 400,
            message: 'Vui lòng lòng gửi lên token!'
        });
        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    const jobSeeker = await JobSeeker.findOne({
        token: token,
    })
    const recruiter = await Recruiter.findOne({
        token: token,
    })

    if (!jobSeeker && !recruiter) {
        res.json({
            code: 400,
            message: 'Không có dữ liệu về người dùng!'
        });
        return;
    }

    if (jobSeeker) {
        res.locals.jobSeeker = jobSeeker;
    }
    else {
        res.locals.recruiter = recruiter;
    }


    next();
}