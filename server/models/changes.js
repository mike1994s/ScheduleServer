var mongoose = require('libs/mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    idNotice: {
        type: String
    },
    groupName: {
        type: String
    },
    dateChanges: {
        type: Date,
        default: Date.now
    },
    isCycleChanged: {
        type: Boolean,
        default: true,
    },
    dateFrom: {
        type: Date
    },
    dateTo: {
        type: Date
    },
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
exports.Changes = mongoose.model('Changes', schema); 