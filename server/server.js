var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var moment = require('moment');
const morgan = require('morgan');
var request = require('request');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const passport = require('passport');


// var sass = require('node-sass-middleware');

// Load environment variables from .env file
dotenv.load();

// Database Connection
if(process.env.PRODUCTION === 'true'){
  mongoose.connect(process.env.MONGODB_PRODUCTION);
}else{
  mongoose.connect(process.env.MONGODB);
}

var db = mongoose.connection;
db.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});


const app = express();

// Controllers
const indexRouter = require('./routes/index');

app.set('port', process.env.PORT || 3001);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
//app.use(passport.initialize());
//app.use(passport.session)
app.use(indexRouter);

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
