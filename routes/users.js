var express = require('express'),
    User = require('../models/User');
var functions = require('../public/javascripts/functions');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});
//
// router.post('/', function (req, res) {
//     // res.send('Name: '+req.body.name+
//     //     '\nstudent_id: '+req.body.student_id+
//     //     '\nlast_grade: '+req.body.last_grade+
//     //     '\nfriends: '+req.body.friends+
//     //     '\nlectures: '+req.body.lectures);
//     var lectures = [];
//     functions.login(req.body.student_id.toString(), req.body.password.toString())
//         .then(functions.getLecture)
//         .then(functions.getLectureLink)
//         .then(function (lectureLinkList){
//             for(let i in lectureLinkList){
//               lectures.push(lectureLinkList[i].lectureName);
//             }
//
//
//         });
//
// })

module.exports = router;
