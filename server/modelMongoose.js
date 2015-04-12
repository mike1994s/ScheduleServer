 var User = require('models/user').User;
 
 var user = new User({
     username : "tester",
     password : "secret"
 })
 
 user.save(function (err, user, affected) {
     if (err) throw err;
     User.findOne({username : "tester"}, function(err, tester) {
         console.log(tester);
     })
 })