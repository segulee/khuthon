/**
 * Created by SEGU on 2017-11-10.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var pickSchema = new Schema({
    title: String,
    types: Number, //solo: 0, more than one: 1
    subject: String,
    date: {type: Date, default: Date.now},
    betting: Number,
    participants: [Number],
    scale: {type: Number, default: 1},
    result: [{participant: Number, score: Number}],
    winner: Number
}, {
    toJSON: { virtuals: true},
    toObject: {virtuals: true}
});

var Pick = mongoose.model('Pick', pickSchema);

module.exports = Pick;