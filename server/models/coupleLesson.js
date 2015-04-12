var mongoose = require('libs/mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    lesson: {
        type: String,
    },
    number: {
        type: String,
    },
    week: {
        type: String,
    },
    teacher: {
        type: String,
    },
    auditory: {
        type: String,
    },
    hull: {
        type: String,
    },
    day: {
        type: String,
    }
});


exports.CoupleLesson = mongoose.model('CoupleLesson', schema); 