var url = require("url");
var Group = require('models/group').Group;
var TeacherLink = require('models/TeacherLink').TeacherLink;
var HttpError = require('error').HttpError;
exports.get = function(req, res, next) {
    var parseUrl = url.parse(req.url, true);
    var day = parseUrl.query['day'];
    var id = parseUrl.query['id'];
    var groupId = parseUrl.query['group'];
    var strQuery = day + '._id';
    var query = {};
    if (!groupId)
        return next(new HttpError(404, "Ошибка"));
    query["_id"] = groupId;

    Group.findOne(query, function(err, group) {
        if (err)
            return next(err);
        var resul = {};
        for (var i = 0; i < group["" + day].length; ++i) {
            var gr = group["" + day][i];
            if (gr["_id"] == id) {
                resul = gr;
            }
        }

        console.log(group.name);
        console.log(resul);
        res.render('updateForm', {
            result: resul,
            groupName: group.name,
            day: day
        });
    });
}


exports.post = function(req, res, next) {
    console.log("idNotice== " + (req.body.idNotice));
    console.log("old day == " + (req.body.dayOld));
    console.log("new day == " + (req.body.day));
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
    console.log("notice = " + obj.idNotice);
    console.log("day = " + obj.day);
    console.log("lesson = " + obj.lesson);
    console.log("number = " + obj.number);
    console.log("week = " + obj.week);
    console.log("auditory = " + obj.auditory);
    console.log("hull = " + obj.hull);
    console.log("group = " + obj.group);
    console.log("isCycleChanged = " + obj.isCycleChanged);
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
        require('models/changes');
        async.each(Object.keys(mongoose.models), function(modelName, callback) {
            mongoose.models[modelName].ensureIndexes(callback);
        }, callback);
    }
    function createUsers(callback) {
        var arr = [];
        arr.push(obj);
        async.each(arr, function(object, callback) {
            var changs = new mongoose.models.Changes({
                idNotice: object.idNotice,
                groupName: object.group,
                isCycleChanged: object.isCycleChanged,
                lesson: object.lesson,
                number: object.number,
                week: object.week,
                auditory: object.auditory,
                hull: object.hull,
                day: object.day,
                teacher: object.teacher
            });
            changs.save(callback);
        }, callback);
    }
    function close(callback) {
        mongoose.disconnect(callback);
    }
    res.send(req.body);
}
