module.exports.createPost = (req, res, next) => {
    if (!req.body.field){
        res.json({
            code: 400,
            message: "Lĩnh vực công việc không được để trống!"
        })
        return;
    }
    if (!req.body.position){
        res.json({
            code: 400,
            message: "Vị trí công việc không được để trống!"
        })
        return;
    }
    if (!req.body.skills){
        res.json({
            code: 400,
            message: "Kỹ năng công việc không được để trống!"
        })
        return;
    }
    if (!req.body.languages){
        res.json({
            code: 400,
            message: "Ngôn ngữ không được để trống!"
        })
        return;
    }
    if (!req.body.summary){
        res.json({
            code: 400,
            message: "Tóm tắt resume không được để trống!"
        })
        return;
    }

    next();
}