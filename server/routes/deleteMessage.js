var url = require("url");
var Group = require('/models/group').Group;
var TeacherLink = require('/models/TeacherLink').TeacherLink;
var Changes = require('/models/changes').Changes;
var Messages = require('/models/messages').Messages;
var HttpError = require('/error').HttpError;
exports.post = function(req, res, next) {
    console.log(req.body.idDelete);
    if (!req.body.idDelete) {
        return next(new HttpError(404, "Ошибка"));
    }
    Messages.find({_id: req.body.idDelete}).remove().exec();
    res.send({});
}
