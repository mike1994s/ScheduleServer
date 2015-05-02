var url = require("/url");
var Group = require('/models/group').Group;
var TeacherLink = require('/models/TeacherLink').TeacherLink;
var Changes = require('/models/changes').Changes;
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
        if (!parseUrl.query['teacher'])
            return next(new HttpError(404, "Ошибка"));
        TeacherLink.find({"hash": parseUrl.query['teacher']}, function(err1, teacher) {
            if (err1)
                return next(err1);
            var name = teacher[0].name;
            var idTeacherHash = parseUrl.query['teacher'];
            if (!parseUrl.query['day']) {
                res.render('teachersDay', {
                    hash: teacher[0].hash
                });
            } else {
                var d = parseUrl.query['day'];
                Group.find(function(error, groups) {
                    if (error)
                        return next(error);
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
                    Changes.find(function(err, all) {
                        if (err)
                            return next(err);
                        var dayGroup = [];
//                        var changesOnToday = [];
//                        for (var k = 0; k < all.length; ++k) {
//                            if (all[j].day == d) {
//                                changesOnToday.push(all[j])
//                            }
//                        }
                        console.log(result.length);
                        for (var i = 0; i < result.length; ++i) {
                            if (all.length == 0) { // если изменнеий нет вообще
                                dayGroup.push(result[i]);
                            } else {
                                for (var j = 0; j < all.length; ++j) {
                                    if (all[j].idNotice == result[i]._id) {
                                        console.log("result" + result[i]);
                                        if (all[j].day == d) {
                                            dayGroup.push(all[j]);
                                            break;
                                        }
                                    } else {
                                        var isPresent = false;
                                        for (var t = 0; t < all.length; ++t) {
                                            if (all[t].idNotice == result[i]._id) {
                                                isPresent = true;
                                                break;
                                            }
                                        }
                                        if (!isPresent) {
                                            dayGroup.push(result[i]);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        console.log(dayGroup.length);
                        for (var i = 0; i < all.length; ++i) {
                            if (all[i].day == d && name == all[i].teacher) {
                                var isPresent = false;
                                for (var j = 0; j < dayGroup.length; ++j) {
                                    if (dayGroup[j].idNotice) {
                                        if (dayGroup[j].idNotice == all[i].idNotice) {
                                            isPresent = true;
                                            break;
                                        }
                                    }
                                }
                                if (!isPresent) {
                                    dayGroup.push(all[i]);
                                }
                            }
                        }
                        console.log(dayGroup.length);
                        for (var j = 0; j < dayGroup.length; ++j) {
                            dayGroup[j].group = dayGroup[j].group || dayGroup[j].groupName;
                        }

                        res.render('teacherDay', {
                            teacher: name,
                            day: d,
                            idGroup: idTeacherHash,
                            result: dayGroup,
                            hash: parseUrl.query['teacher']
                        });
                    });
                });
            }
        });
    }

};
