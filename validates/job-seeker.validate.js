module.exports.jobSeekerCheck = async (req, res, next) => {
    if (!req.body.fullName){
        res.json({
            code: 400,
            message: "Tên không được để trống!"
        })
        return;
    }
    if (req.body.fullName.length < 5){
        res.json({
            code: 400,
            message: "Tên phải có ít nhất 5 ký tự!"
        })
        return;
    }
    if (!req.body.email){
        res.json({
            code: 400,
            message: "Email không được để trống!"
        })
        return;
    }
    if (!req.body.password){
        res.json({
            code: 400,
            message: "Mật khẩu không được để trống!"
        })
        return;
    }
    if (!req.body.gender){
        res.json({
            code: 400,
            message: "Giới tính không được để trống!"
        })
        return;
    }
    if (!req.body.phone){
        res.json({
            code: 400,
            message: "Số điện thoại không được để trống!"
        })
        return;
    }
    if (!req.body.address){
        res.json({
            code: 400,
            message: "Địa chỉ không được để trống!"
        })
        return;
    }
    next();
}