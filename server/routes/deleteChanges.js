var url = require("url");
var Group = require('models/group').Group;
var TeacherLink = require('models/TeacherLink').TeacherLink;
var Changes = require('models/changes').Changes;
exports.post = function(req, res, next) {
    console.log(req.body.idDelete);
    Changes.find({_id: req.body.idDelete}).remove().exec();
    res.send({});
}