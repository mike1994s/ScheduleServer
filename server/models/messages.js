var mongoose = require('libs/mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    idGroup: {
        type: String
    },
    dateMessage: {
        type: Date,
        default: Date.now
    },
    dateTo: {
        type: Date,
    },
    text: {
        type: String,
    },
    teacherHash: {
        type: String,
    },
    isPublicated: {
        type: Boolean,
        default: false
    }
});
exports.Messages = mongoose.model('Messages', schema); 