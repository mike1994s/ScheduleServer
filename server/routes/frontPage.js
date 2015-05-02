var Group = require('/models/group').Group;
var TeacherLink = require('/models/TeacherLink').TeacherLink;

exports.get = function(req, res, next) {
    Group.find(function(err, all) {
        if (err)
            next(err);
        console.log(all.length);
        var countGroup = all.length;
        TeacherLink.find(function(error, everyBody) {
            if (error) {
                next(error);
            }
            console.log(everyBody.length);
            var countTeachers = everyBody.length;
            res.render('frontpage', {
                teachers: countTeachers,
                groups: countGroup,
            });

        })
    })
};
