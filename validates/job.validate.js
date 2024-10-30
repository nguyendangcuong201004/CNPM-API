
module.exports.createPost = (req, res, next) => {
    if (!req.body.title){
        res.json({
            code: 400,
            message: "Tiêu đề công việc không được để trống!"
        })
        return;
    }
    if (!req.body.description){
        res.json({
            code: 400,
            message: "Mô tả công việc không được để trống!"
        })
        return;
    }
    if (!req.body.requirements){
        res.json({
            code: 400,
            message: "Yêu cầu công việc không được để trống!"
        })
        return;
    }
    if (!req.body.location){
        res.json({
            code: 400,
            message: "Nơi làm việc không được để trống!"
        })
        return;
    }
    if (!req.body.salary){
        res.json({
            code: 400,
            message: "Lương không được để trống!"
        })
        return;
    }
    if (!req.body.status){
        res.json({
            code: 400,
            message: "Trạng thái công việc không được để trống!"
        })
        return;
    }
    if (!req.body.jobType){
        res.json({
            code: 400,
            message: "Tính chất công việc không được để trống!"
        })
        return;
    }
    next();
}