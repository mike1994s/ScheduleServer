var url = require("url");
var Group = require('models/group').Group;
var TeacherLink = require('models/TeacherLink').TeacherLink;
var Changes = require('models/changes').Changes;
var HttpError = require('error').HttpError;

exports.get = function(req, res, next) {
    var parseUrl = url.parse(req.url, true);
    if (parseUrl.query['id_group'] && parseUrl.query['teacherHash']) {
        var idGroup = parseUrl.query['id_group'];
        var teacherHash = parseUrl.query['teacherHash'];
        res.render('messages/createMessage', {
            id: idGroup,
            teacherHash: teacherHash
        });
    } else {
        return next(new HttpError(404, "Ошибка"));
    }

}
exports.post = function(req, res, next) {
    var obj = {};
    obj.id = req.body.id;
    obj.teacherHash = req.body.teacherHash;
    obj.dateTo = req.body.dateTo || Date.now();
    obj.text = req.body.text || "";
    obj.isPublicated = req.body.isPublicated || false;
    if (obj.isPublicated !== false && obj.isPublicated === 'on') {
        obj.isPublicated = true;
    } else {
        obj.isPublicated = false;
    }
    console.log(new Date(obj.dateTo + " 01:00"));
    var mongoose = require('libs/mongoose');
    var async = require('async');
    async.series([
        //   open,
        //  dropDatabase,
        requireModels,
        createUsers
    ], function(err, results) {
        console.log(arguments);
        console.log("END-----");
    })
    function open(callback) {
        mongoose.connection.on('open', callback);
        var db = mongoose.connection.db;
    }

    function dropDatabase(callback) {
        var db = mongoose.connection.db;
        db.dropDatabase(callback);
//        callback/();
    }

    function requireModels(callback) {
        require('models/messages');
        async.each(Object.keys(mongoose.models), function(modelName, callback) {
            mongoose.models[modelName].ensureIndexes(callback);
        }, callback);
    }
    function createUsers(callback) {
        var arr = [];
        arr.push(obj);
        async.each(arr, function(object, callback) {
            var message = new mongoose.models.Messages({
                idGroup: object.id,
                dateMessage: Date.now(),
                dateTo: object.dateTo,
                text: object.text,
                teacherHash: object.teacherHash,
                isPublicated: object.isPublicated
            });
            message.save(callback);
        }, callback);
    }
    function close(callback) {
        mongoose.disconnect(callback);
    }
    res.send(req.body);
}
