var Group = require('models/group').Group;
var url = require("url");
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
            Group.findById(parseUrl.query['group'], function(err, group) {
                if (err)
                    return next(err);
                res.render('group', {
                    group: group,
                });
            });
        } else {
            var day = parseUrl.query['day'];
            Group.findById(parseUrl.query['group'], function(err, group) {
                if (err)
                    return next(err);
                console.log(group["" + day]);
                res.render('groupDay', {
                    groupDay: group["" + day],
                    day: day,
                    nameGroup : group["name"]
                });
            });
        }
    }


};