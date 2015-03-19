//var MongoClient = require('mongodb').MongoClient
//        , format = require('util').format
//
//MongoClient.connect('mongodb://127.0.0.1/chat', function(err, db) {
//    if (err)
//        throw err;
//
//    var collection = db.collection('test_insert');
//    collection.remove({}, function(err, affected) {
//        if (err)
//            throw err;
//        collection.insert({a: 2}, function(err, docs) {
//            collection.count(function(err, count) {
//                console.log(format("count = %s", count));
//            })
//          var cursor =  collection.find({a: 2});
//          cursor.toArray(function(err, results) {
//                console.dir(results);
//                db.close();
//            })
//        })
//    })
//})
var mongoose = require('libs/mongoose');
 

var async = require('async')

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
//    close
], function(err, results) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
})
//console.log(mongoose.connection.readyState);

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('models/user');
    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}
function createUsers(callback) {
//    var User = require('models/user').User;
    var users = [
        {
            username: 'Вася',
            password: 'supervasya'
        },
        {
            username: 'Петя',
            password: '123'
        },
        {
            username: 'admin',
            password: 'truetruehero'
        },
    ];
    async.each(users, function(userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
    //    async.parallel([
//        function(callback) {
//            var vasya = new User({
//                username: 'Вася',
//                password: 'supervasya'
//            })
//            vasya.save(function(err) {
//                callback(err, vasya);
//            });
//        },
//        function(callback) {
//            var petya = new User({
//                username: 'Петя',
//                password: '123'
//            })
//            petya.save(function(err) {
//                callback(err, petya);
//            });
//        },
//        function(callback) {
//            var admin = new User({
//                username: 'admin',
//                password: 'truetruehero'
//            })
//            admin.save(function(err) {
//                callback(err, admin);
//            });
//    }
//    ],
//            callback
//            );
}

function close(callback) {
    mongoose.disconnect(callback);
}
//mongoose.connection.on('open', function() {
//    var db = mongoose.connection.db;
//    db.dropDatabase(function(err) {
//        if (err)
//            throw err;
////        console.log("Ok");
//
//
//        function(err, results) {
//            console.log(arguments);
//        }
//
//
//    })
//})
