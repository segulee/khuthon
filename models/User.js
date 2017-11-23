var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    student_id: Number,
    last_grade: Number,
    friends: [Number],
    lectures: [String]

}, {
    toJSON: {virtuals: true},
    toOject: {virtuals: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;