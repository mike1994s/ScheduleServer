var url = require("url");
var Group = require('models/group').Group;
var TeacherLink = require('models/TeacherLink').TeacherLink;
exports.get = function(req, res, next) {
    var parseUrl = url.parse(req.url, true);
    if (!(parseUrl.query['teacher'])) {
        TeacherLink.find(function(err, teachers) {
            if (err)
                return next(err);
            res.render('teacherLink', {
                teachers: teachers,
            });
        });
    } else {
     //   console.log(parseUrl.query['teacher']);
        TeacherLink.find({"hash": parseUrl.query['teacher']}, function(err, teacher) {
            if (err)
                return next(err);
            var name = teacher[0].name;
            var idTeacherHash = parseUrl.query['teacher'];
            if (!parseUrl.query['day']) {
                res.render('teachersDay', {
                    hash: teacher[0].hash
                });
            } else {
                var d = parseUrl.query['day'];
                Group.find(function(err, groups) {
                    var result = [];
                    for (var i = 0; i < groups.length; ++i) {
                        for (var j = 0; j < groups[i]["" + d].length; ++j) {
                            var group = groups[i].name;
                            var idGroup = groups[i]._id;
                            if (groups[i]["" + d][j].teacher === name) {
                                groups[i]["" + d][j].group = group;
                                groups[i]["" + d][j].idGroup = idGroup;
                                result.push(groups[i]["" + d][j]);
                            }
                        }
                    }
                    console.log("result  = " + result[0]);
                    res.render('teacherDay', {
                        teacher: name,
                        day: d,
                        idGroup :idTeacherHash,
                        result: result,
                        hash: parseUrl.query['teacher']
                    });
                });
            }
        });
    }

};
