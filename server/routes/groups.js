var Group = require('models/group').Group;
var url = require("url");
var Changes = require('models/changes').Changes;
var Messages = require('models/messages').Messages;
var TeacherLink = require('models/TeacherLink').TeacherLink;
var HttpError = require('error').HttpError;

exports.get = function(req, res, next) {
    console.log(req.url);
    var parseUrl = url.parse(req.url, true);
    if (!(parseUrl.query['group'])) {
        Group.find(function(err, groups) {
            if (err)
                return next(err);
            console.log(groups[0].name);
            res.render('groups', {
                groupses: groups,
            });
        });
    } else {
        if (!(parseUrl.query['day'])) {
            if (!parseUrl.query['group']) {
                return next(new HttpError(404, "Ошибка"));
            }
            Group.findById(parseUrl.query['group'], function(err, group) {
                if (err)
                    return next(err);
                if (!parseUrl.query['group']) {
                    return next(new HttpError(404, "Ошибка"));
                }
                Messages.find({"idGroup": parseUrl.query['group'], "isPublicated": true}, function(err1, msgs) {
                    if (err1)
                        return next(err1);
                    var arr = [];
                    console.log(arr);
                    res.render('group', {
                        group: group,
                        messages: msgs,
                    });
                })

            });
        } else {
            var day = parseUrl.query['day'];
            if (!parseUrl.query['group']) {
                return next(new HttpError(404, "Ошибка"));
            }
            if (!day) {
                return next(new HttpError(404, "Ошибка"));
            }
            Group.findById(parseUrl.query['group'], function(erro, group) {
                if (erro)
                    return next(erro);
                Changes.find(function(err2, all) {
                    if (err2)
                        return next(err2);
//                    console.log(group["" + day]);
                    var dayGroup = [];
                    for (var i = 0; i < group["" + day].length; ++i) {
                        if (group["" + day][i].number == 7)
                            continue;
                        if (all.length == 0) {
                            dayGroup.push(group["" + day][i]);
                        } else {
                            for (var j = 0; j < all.length; ++j) {
                                if (all[j].idNotice == group["" + day][i]._id) {
                                    if (all[j].day == day) {
                                        dayGroup.push(all[j]);
                                    }
                                } else {
                                    var isPresent = false;
                                    for (var t = 0; t < all.length; ++t) {
                                        if (all[t].idNotice == group["" + day][i]._id) {
                                            isPresent = true;
                                            break;
                                        }
                                    }
                                    if (!isPresent) {
                                        console.log(group["" + day][i]);
                                        dayGroup.push(group["" + day][i]);
                                        break;
                                    }
                                }
                            }
                        }
                    }
//                    for (var h = 0; h < dayGroup.length; ++h) {
//                        console.log(dayGroup[h]);
//                    }
                    for (var i = 0; i < all.length; ++i) {
                        if (all[i].day == day && group.name == all[i].groupName) {
                            var isPresent = false;
                            for (var j = 0; j < dayGroup.length; ++j) {
                                if (dayGroup[j].idNotice) {
                                    if (dayGroup[j].idNotice == all[i].idNotice) {
                                        isPresent = true;
                                        break;
                                    }
                                }
                            }
                            if (!isPresent)
                                dayGroup.push(all[i]);
                        }
                    }

                    res.render('groupDay', {
                        groupDay: dayGroup,
                        day: day,
                        nameGroup: group["name"]

                    });
                });
            });
        }
    }


};