//var User = require('models/user').User;
//var HttpError = require('error').HttpError;
//var Group = require('models/group').Group;
//var ObjectID = require('mongodb').ObjectID;
//module.exports = function(app) {
//    app.get('/', function(req, res, next) {
//        res.render('index', {
////        body : '<b> hello </b>',
////        title : 'First'
//        })
//
//    })
//
//
//    app.get('/users', function(req, res, next) {
//        User.find({}, function(err, users) {
//            if (err)
//                return next(err);
//            res.json(users);
//        })
//    })
//
//    app.get('/user/:id', function(req, res, next) {
//        User.findById(req.params.id, function(err, user) {
//            if (err)
//                return next(err);
//            if (!user) {
//                next(new HttpError(404, "User Not found"));
//            } else {
//                res.json(user);
//            }
//        });
//    })
//    app.get('/groups/:id', function(req, res, next) {
//        try {
//            var id = new ObjectID(req.params.id);
//        } catch (e) {
//            console.log(e);
//            return next(404);
//        }
//        Group.findById(req.params.id, function(err, user) {
//            if (err)
//                return next(err);
//            if (!user) {
//                next(new HttpError(404, "Group Not found"));
//            }
//            else {
//                res.json(user);
//            }
//        });
//    })
//    app.get('/groups', function(req, res, next) {
//        Group.find({}, function(err, users) {
//            if (err)
//                return next(err);
//            res.json(users);
//        })
//    })
//};
//
////550d42c531ad07281102985d
var checkAuth = require('middleware/checkAuth');

module.exports = function(app) {
    app.get('/', require('./frontpage').get);

    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);

    app.post('/logout', require('./logout').post);

    app.get('/chat', checkAuth, require('./chat').get);
    app.get('/groups', checkAuth, require('./groups').get);

    app.get('/teachers', checkAuth, require('./teachers').get);
}