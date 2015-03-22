var mongoose = require('libs/mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    name: {
        type: String,
    },
    monday: [{
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
        }

    ],
    tuesday: [{
            lesson: {
                type: String,
//                required: true
            },
            number: {
                type: String,
//                required: true
            },
            week: {
                type: String,
            },
            teacher: {
                type: String,
//                required: true
            },
            auditory: {
                type: String,
//                required: true
            },
            hull: {
                type: String,
//                required: true
            },
            day: {
                type: String,
//                required: true
            }
        }
    ],
    wednesday: [{
            lesson: {
                type: String,
//                required: true
            },
            number: {
                type: String,
//                required: true
            },
            week: {
                type: String,
            },
            teacher: {
                type: String,
//                required: true
            },
            auditory: {
                type: String,
//                required: true
            },
            hull: {
                type: String,
//                required: true
            },
            day: {
                type: String,
//                required: true
            }
        }
    ],
    thursday: [{
            lesson: {
                type: String,
//                required: true
            },
            number: {
                type: String,
//                required: true
            },
            week: {
                type: String,
            },
            teacher: {
                type: String,
//                required: true
            },
            auditory: {
                type: String,
//                required: true
            },
            hull: {
                type: String,
//                required: true
            },
            day: {
                type: String,
//                required: true
            }
        }
    ],
    friday: [{
            lesson: {
                type: String,
//                required: true
            },
            number: {
                type: String,
//                required: true
            },
            week: {
                type: String,
            },
            teacher: {
                type: String,
//                required: true
            },
            auditory: {
                type: String,
//                required: true
            },
            hull: {
                type: String,
//                required: true
            },
            day: {
                type: String,
//                required: true
            }
        }
    ],
    saturday: [{
            lesson: {
                type: String,
//                required: true
            },
            number: {
                type: String,
//                required: true
            },
            week: {
                type: String,
            },
            teacher: {
                type: String,
//                required: true
            },
            auditory: {
                type: String,
//                required: true
            },
            hull: {
                type: String,
//                required: true
            },
            day: {
                type: String,
//                required: true
            }
        }
    ]
});
exports.Group = mongoose.model('Group', schema); 