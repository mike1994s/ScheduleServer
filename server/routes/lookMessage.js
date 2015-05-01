var url = require("url");
var Group = require('models/group').Group;
var TeacherLink = require('models/TeacherLink').TeacherLink;
var Changes = require('models/changes').Changes;
var HttpError = require('error').HttpError;
var Messages = require('models/messages').Messages;
exports.get = function(req, res, next) {
    console.log(req.url);
    var parseUrl = url.parse(req.url, true);
    var _id = parseUrl.query['id'];
    if (!_id) {
        return next(new HttpError(404, "Ошибка"));
    }
    Messages.findById(_id, function(err, msg) {
        if (err)
            next(err);
        if (!msg) {
            return next(new HttpError(404, "Ошибка"));
        }
        TeacherLink.findOne({"hash": msg.teacherHash}, function(err, teacher) {
            if (err)
                next(err);
            console.log(teacher);
            res.render('messages/message_for_group', {
                message: msg,
                teacher: teacher
            })
        })
    })


}