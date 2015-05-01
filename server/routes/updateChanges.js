var url = require("url");
var Group = require('models/group').Group;
var TeacherLink = require('models/TeacherLink').TeacherLink;
var Changes = require('models/changes').Changes;
var HttpError = require('error').HttpError;

exports.get = function(req, res, next) {
    var parseUrl = url.parse(req.url, true);
    var _id = parseUrl.query['id'];
    if (!_id)
        return next(new HttpError(404, "Ошибка"));
    Changes.findById(_id, function(err, result) {
        if (err)
            next(err);
        console.log(result);
        res.render('updateChanges', {
            result: result,
        });
    })
}

exports.post = function(req, res, next) {
    var obj = {};
    obj.idNotice = req.body.idNotice;
    obj.day = req.body.day || req.body.dayOld;
    obj.lesson = req.body.lesson || req.body.lessonOld;
    obj.number = req.body.number || req.body.numberOld;
    obj.week = req.body.week || req.body.weekOld;
    obj.auditory = req.body.auditory || req.body.auditoryOld;
    obj.hull = req.body.hull || req.body.hullOld;
    obj.group = req.body.groupName;
    obj.isCycleChanged = req.body.isCycleChanged;
    obj.teacher = req.body.teacher;
    obj._id = req.body._id;
    console.log(obj);
    if (!obj._id)
        return next(new HttpError(404, "Ошибка"));
    Changes.findById(obj._id, function(err, change) {
        if (err)
            next(err);
        change.isCycleChanged = obj.isCycleChanged;
        change.lesson = obj.lesson;
        change.number = obj.number;
        change.week = obj.week;
        change.auditory = obj.auditory;
        change.hull = obj.hull;
        change.day = obj.day;
        change.save();
    });
    res.send({});
}