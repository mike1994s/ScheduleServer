var url = require("url");
var Group = require('models/group').Group;
function Teacher(name, hash) {
    this.name = name;
    this.hash = hash;
}

function hashing(str) {
    var hash = 0;
    var str = String(str);
    if (str.length == 0)
        return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function isPresent(obj, arr) {
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i].hash == obj.hash) {
            return true;
        }
    }
    return false;

}
function deleteDuplicate(teachers) {
    var res = [];
    for (var i = 0; i < teachers.length; ++i) {
        if (!isPresent(teachers[i], res)) {
            res.push(teachers[i]);
        }
    }
    return res;
}
    Group.find(function(err, groups) {
    if (err)
        return next(err);
    
    function handleDay(day, teachs) {
        for (var j = 0; j < day.length; ++j) {
            if (day[j].teacher.trim() === "") {
                return 0;
            }
            var hash = hashing(day[j].teacher);
            var teacher = new Teacher(day[j].teacher, (hash > 0 ? hash : -1 * hash));
            teachs.push(teacher);
        }

    }
    var teachers = [];

    for (var i = 0; i < groups.length; ++i) {
        handleDay(groups[i].saturday, teachers);
        handleDay(groups[i].monday, teachers);
        handleDay(groups[i].tuesday, teachers);
        handleDay(groups[i].wednesday, teachers);
        handleDay(groups[i].thursday, teachers);
        handleDay(groups[i].friday, teachers);
    }
    teachers = deleteDuplicate(teachers);
    var mongoose = require('libs/mongoose');
    var async = require('async')
    async.series([
     //   open,
        //  dropDatabase,
        requireModels,
        createUsers
    ], function(err, results) {
        console.log(arguments);
        console.log("END-----");
        mongoose.disconnect();
        process.exit(err ? 255 : 0);
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
        require('models/teacherLink');
        async.each(Object.keys(mongoose.models), function(modelName, callback) {
            mongoose.models[modelName].ensureIndexes(callback);
        }, callback);
    }
    function createUsers(callback) {
//    var User = require('models/user').User;
        var teac = teachers;
        async.each(teac, function(teacherData, callback) {
            var group = new mongoose.models.TeacherLink({
                name: teacherData.name,
                hash: teacherData.hash
            });
//            console.log(group);
            group.save(callback);
        }, callback);
    }
    function close(callback) {
        mongoose.disconnect(callback);
        console.log("end");
    }
});
