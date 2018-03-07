const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const moment = require('moment');
const morgan = require('morgan');
const request = require('request');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');

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



app.set('port', process.env.PORT || 3001);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
//app.use(cookieParser());
app.use(helmet());
app.use(passport.initialize());
app.use(cors());
// app.use(function(err, req, res, next){
//   console("hello");
//   next();
// })

// Controllers
require('./config/passport')(passport);
const indexRouter = require('./routes/index')(passport);


app.use(indexRouter);



// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}




// app.listen(app.get('port'), function() {
//   console.log('Express server listening on port ' + app.get('port'));
// });


const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY),
  cert: fs.readFileSync(process.env.SSL_CERT)
}

https.createServer(sslOptions, app).listen(3080,function() {
  console.log('Express server listening on port ' + 3080);
});

module.exports = app;
