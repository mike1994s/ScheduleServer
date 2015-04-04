var mongoose = require('libs/mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
      name: {
        type: String,
    },
    hash : {
        type: String,
    }
});

exports.TeacherLink = mongoose.model('TeacherLink', schema); 