const Recruiter = require("../models/recruiter.model.js")
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

// [POST] /api/v1/recruiter/register
module.exports.register = async (req, res) => {

    const exitEmail = await Recruiter.findOne({
        email: req.body.email,
    })

    if (exitEmail){
        res.json ({
            "code": 400,
            message: "Email đã tồn tại!"
        })
        return;
    }

    console.log(req.body)

    const dataRecruiter = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
        addressOfCompany: req.body.address,
        token: generateHelper.generateRandomString(20),
        company: req.body.company
    }

    const recruiter = new Recruiter(dataRecruiter);
    await recruiter.save();

    const token = recruiter.token

    res.json ({
        "code": 200,
        token: token,
        message: "Đăng ký tài khoản thành công!"
    })
}

// [POST] /api/v1/recruiter/login
module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const exitUser = await Recruiter.findOne({
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

// [POST] /api/v1/recruiter/forgot
module.exports.passwordForgot = async (req, res) => {

    const email = req.body.email;
    
    const exitRecruiter = await Recruiter.findOne({
        email: email,
    })

    if (!exitRecruiter){
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

// [POST] /v1/recruiter/password/otp
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

    const recruiter = await Recruiter.findOne({
        email: email,
    })

    const token = recruiter.token;

    res.json({
        code: 200,
        token: token,
        message: "Xác thực thành công!"
    })
}


// [POST] /v1/recruiter/password/reset
module.exports.passwordReset = async (req, res) => {

    const token = req.body.token;
    const password = req.body.password;

    const recruiter = await Recruiter.findOne({
        token: token,
    })

    if (recruiter) {
        await Recruiter.updateOne({
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


// [GET] /v1/recruter/detail

module.exports.detail = async (req, res) => {
    res.json({
        code: 200,
        message: "Thông tin người đăng tin tuyển dụng:",
        recruiter: res.locals.recruiter
    })
}