const JobSeeker = require("../models/job-seeker.model.js")
const ForgotPassword = require("../models/forgot-password.model.js")
const md5 = require('md5');

const generateHelper = require("../../helpers/generate.helper.js")
const  sendEmailHelper = require("../../helpers/sendmail.helper.js")

module.exports.index = async (req, res) => {
    res.json({
        code: 200,
        message: "Nguyen Dang Cuong"
    })
}

// [POST] /api/v1/job-seeker/register
module.exports.register = async (req, res) => {

    const exitEmail = await JobSeeker.findOne({
        email: req.body.email,
    })

    if (exitEmail){
        res.json ({
            "code": 400,
            message: "Email đã tồn tại!"
        })
        return;
    }

    const dataJobSeeker = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
        address: req.body.address,
        status: "finding",
        token: generateHelper.generateRandomString(20)
    }

    const jobSeeker = new JobSeeker(dataJobSeeker);
    await jobSeeker.save();

    const token = jobSeeker.token

    res.json ({
        "code": 200,
        token: token,
        message: "Đăng ký tài khoản thành công!"
    })
}

// [POST] /api/v1/job-seeker/login
module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const exitUser = await JobSeeker.findOne({
        email: email,
    })

    if (!exitUser){
        res.json ({
            "code": 400,
            message: "Email không tồn tại!"
        })
        return;
    }

    if(md5(password) != exitUser.password){
        res.json ({
            "code": 400,
            message: "Sai mật khẩu!"
        })
        return;
    }

    const token = exitUser.token;

    res.json ({
        "code": 200,
        token: token,
        message: "Đăng nhập thành công!"
    })
}

// [POST] /api/v1/job-seeker/forgot
module.exports.passwordForgot = async (req, res) => {

    const email = req.body.email;
    
    const exitJobSeeker = await JobSeeker.findOne({
        email: email,
    })

    if (!exitJobSeeker){
        res.json ({
            "code": 400,
            message: "Email không tồn tại!"
        })
        return;
    }

    const otp = generateHelper.generateRandomNumber(6);

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now() + 3*60*1000,
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();


    const subject = "Lấy lại mật khẩu";
    const text = `Mã OTP xác thực tài khoản của bạn là: ${otp}. \nMã OTP có hiệu lực trong vòng 3 phút. Vui lòng không cung cấp mã OTP này cho bất kỳ ai.`;

    sendEmailHelper.sendEmail(email, subject, text)
    
    
    res.json({
        code: 200,
        message: "OTP đã được gửi qua email!"
    })
}

// [POST] /v1/job-seeker/password/otp
module.exports.passwordOtp = async (req, res) => {

    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp,
    })

    if (!result){
        res.json({
            code: 400,
            message: "OTP không hợp lệ!"
        });
        return;
    }

    const jobSeeker = await JobSeeker.findOne({
        email: email,
    })

    const token = jobSeeker.token;

    res.json({
        code: 200,
        token: token,
        message: "Xác thực thành công!"
    })
}


// [POST] /v1/job-seeker/password/reset
module.exports.passwordReset = async (req, res) => {

    const token = req.body.token;
    const password = req.body.password;

    const jobSeeker = await JobSeeker.findOne({
        token: token,
    })

    if (jobSeeker) {
        await JobSeeker.updateOne({
            token: token,
        }, {
            password: md5(password)
        })
    
        res.json({
            code: 200,
            message: "Đổi mật khẩu thành công!"
        })
    }
    else{
        res.json({
            code: 400,
            message: "Đã xảy ra lỗi!"
        })
    }

}


// [GET] /v1/job-seeker/detail

module.exports.detail = async (req, res) => {
    res.json({
        code: 200,
        message: "Thông tin người tìm việc:",
        jobSeeker: res.locals.jobSeeker
    })
}