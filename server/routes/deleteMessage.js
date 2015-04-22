var url = require("url");
var Group = require('models/group').Group;
var TeacherLink = require('models/TeacherLink').TeacherLink;
var Changes = require('models/changes').Changes;
var Messages = require('models/messages').Messages;
exports.post = function(req, res, next) {
    console.log(req.body.idDelete);
    Messages.find({_id: req.body.idDelete}).remove().exec();
    res.send({});
}