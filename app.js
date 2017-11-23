var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//mongodb connect
mongoose.connect('mongodb://khuthon:wjdwkghwl123@ds157298.mlab.com:57298/segu');
mongoose.connection.on('error',console.log);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method', {methods: ['POST', 'GET']}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'long-long-long-secret-string-1313513tefgwdsvbjkvasd'
}));
app.use(flash());

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




app.use(function(req, res, next) {
    res.locals.currentUser = req.session.user;
    res.locals.flashMessages = req.flash();
    next();
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
