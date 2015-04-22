var url = require("url");
var Group = require('models/group').Group;
var TeacherLink = require('models/TeacherLink').TeacherLink;
var Changes = require('models/changes').Changes;
var Messages = require('models/messages').Messages;
exports.get = function(req, res, next) {
    var parseUrl = url.parse(req.url, true);
    if (parseUrl.query['hash']) {
        var teacherHash = parseUrl.query['hash'];
        Messages.find({teacherHash: teacherHash}, function(err, msgs) {
            if (err)
                next(err);
            console.log(msgs);
            res.render('messages/all_messages_of_teacher', {
                msgs: msgs
            });
        })
    }
    if (parseUrl.query['ident']) {
        Messages.findById(parseUrl.query['ident'], function(err, msg) {
            if (err)
                next(err);
            console.log(msg);
            res.render('messages/edit_message', {
                msg: msg
            });
        })
    }

}
exports.post = function(req, res, next) {
    var obj = {};
    obj.id = req.body.id;
    obj.teacherHash = req.body.teacherHash;
    obj.dateTo = req.body.dateTo || req.body.oldDateTo;
    obj.text = req.body.text || "";
    obj.isPublicated = req.body.isPublicated || false;
    if (obj.isPublicated !== false && obj.isPublicated === 'on') {
        obj.isPublicated = true;
    } else {
        obj.isPublicated = false;
    }
    obj._id = req.body._id;
    console.log(obj);
    Messages.findById(obj._id, function(err, change) {
        if (err)
            next(err);
        change.idGroup = obj.id;
        change.dateMessage = Date.now();
        change.dateTo = obj.dateTo;
        change.text = obj.text;
        change.isPublicated = obj.isPublicated;
        change.teacherHash = obj.teacherHash;
        change.save();
    });
    res.send({});
}


