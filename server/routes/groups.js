var Group = require('models/group').Group;
var url = require("url");
var Changes = require('models/changes').Changes;
exports.get = function (req, res, next) {
    console.log(req.url);
    var parseUrl = url.parse(req.url, true);
    if (!(parseUrl.query['group'])) {
        Group.find(function (err, groups) {
            if (err)
                return next(err);
            console.log(groups[0].name);
            res.render('groups', {
                groupses: groups,
            });
        });
    } else {
        if (!(parseUrl.query['day'])) {
            Group.findById(parseUrl.query['group'], function (err, group) {
                if (err)
                    return next(err);
                res.render('group', {
                    group: group,
                });
            });
        } else {
            var day = parseUrl.query['day'];
            Group.findById(parseUrl.query['group'], function (err, group) {
                if (err)
                    return next(err);
                Changes.find(function (err, all) {
                    if (err)
                        return next(err);

                    console.log(group["" + day]);
                    var dayGroup = [];

                    for (var i = 0; i < group["" + day].length; ++i) {
                        if (all.length == 0) {
                            dayGroup.push(group["" + day][i]);
                            continue;
                        }
                        for (var j = 0; j < all.length; ++j) {
                            if (all[j].idNotice == group["" + day][i]._id) {
                                if (all[j].day == day)
                                    dayGroup.push(all[j]);
                            } else {
                                dayGroup.push(group["" + day][i]);
                            }
                        }
                    }
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