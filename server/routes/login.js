var User = require('/models/user').User;
var HttpError = require('/error').HttpError;
var AuthError = require('/models/user').AuthError;
var TeacherLink = require('/models/TeacherLink').TeacherLink;

exports.get = function(req, res) {
    res.render('login');
};

exports.post = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var hostname = req.headers.host;
    User.authorize(username, password, function(err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                next(err);
            }
        }

        req.session.user = user._id;
        if (username == "admin") {
            res.end();
            return;
        }
        var r = new RegExp(username, 'i');
        var resultUrl = "";
        TeacherLink.findOne({name: {$regex: r}}, function(erro, teacher) {
            if (erro)
                next(erro);
            console.log(teacher);
            console.log("http://" + hostname + "/teachers?teacher=" + teacher.hash);
            resultUrl = "http://" + hostname + "/teachers?teacher=" + teacher.hash;
            var urlPart = "/teachers?teacher=" + teacher.hash;
            res.send({redirect: urlPart});
        });


    })

}
