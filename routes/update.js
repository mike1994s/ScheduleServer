var url = require("url");
var Group = require('models/group').Group;
var TeacherLink = require('models/TeacherLink').TeacherLink;
exports.get = function(req, res, next) {
    var parseUrl = url.parse(req.url, true);
    var day = parseUrl.query['day'];
    var id = parseUrl.query['id'];
    var groupId = parseUrl.query['group'];
//    var strQuery = day + '._id';
    var strQuery = day + '._id';
//    console.log(strQuery + " :" + id);
    var query = {};
    query["_id"] = groupId;
//    Group.update({_id: '' + groupId}, {strQuery: id}, function(err, group) {
    Group.findOne(query, function(err, group) {
        if (err)
            return next(err);
        var resul ={};
        for (var i = 0; i < group[""+day].length; ++i) {
            var gr = group[""+day][i];
            if (gr["_id"] == id) {
                resul = gr; 
            }
        }
        console.log(resul);
          res.render('updateForm', {
                        result: resul,
                    });
    });
}