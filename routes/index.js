var express = require('express'),
    User =  require('../models/User');

var functions = require('../public/javascripts/functions');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express ejs' });
});

router.post('/users', function(req, res, next){
    var lectures = [];
    functions.login(req.body.student_id.toString(), req.body.password.toString())
        .then(functions.getLecture)
        .then(functions.getLectureLink)
        .then(function (lectureLinkList){
            for(let i in lectureLinkList){
                lectures.push(lectureLinkList[i].lectureName);
            }
        }).then(functions.getNameMain)
        .then(functions.getName)
        .then(function (name){

            User.findOne({student_id: req.body.student_id}, function(err, user){
                if (err) {
                    res.render('error', {message: "Error", error: err});
                } else if (!user) {
                    var newUser = new User({
                        student_id: req.body.student_id,
                        name: name,
                        last_grade: 3,
                        lectures: lectures,
                    });
                    newUser.save(function(err){
                        if (err) {
                            return next(err);
                        } else {
                            console.log(newUser);

                            res.redirect('/', newUser);
                        }
                    });
                }else{
                    console.log(user);
                    req.flash('success', '로그인 되었습니다.');
                    res.redirect('/');
                }
        });
    });
});

module.exports = router;
