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
var request = require('request');
// var sass = require('node-sass-middleware');



// Load environment variables from .env file
dotenv.load();

// ES6 Transpiler
// require('babel-core/register');
// require('babel-polyfill');

// Models
var User = require('./models/User');
var Ingredient = require('./models/Ingredient');
var Recipe = require('./models/Recipe');
var Menu = require('./models/Menu');

// Controllers
const userController = require('./controllers/user');
const contactController = require('./controllers/contact');
const ingredientController = require('./controllers/ingredient');
const recipeController = require('./controllers/recipe');
const menuController = require('./controllers/menu');


var app = express();



mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
// app.set('views', path.join(__dirname, 'src', 'server', 'views'));
// app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3001);
app.use(compression());
//app.use(sass({ src: path.join(__dirname, 'public'), dest: path.join(__dirname, 'public') }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());


app.post('/contact', contactController.contactPost);
app.put('/account', userController.ensureAuthenticated, userController.accountPut);
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.post('/signup', userController.signupPost);
app.post('/login', userController.loginPost);
app.post('/forgot', userController.forgotPost);
app.post('/reset/:token', userController.resetPost);
app.get('/unlink/:provider', userController.authGoogle);
app.get('/auth/google/callback', userController.authGoogleCallback);
app.get('/api/ingredient', ingredientController.ingredientGet);
app.get('/api/ingredient/:ingredient', ingredientController.ingredientGet);
app.post('/api/ingredient', ingredientController.ingredientPost);
app.delete('/api/ingredient/:ingredient', ingredientController.ingredientDelete);
app.post('/api/recipe', recipeController.recipePost);
app.get('/api/recipe', recipeController.recipeGet);
app.delete('/api/recipe/:recipe', recipeController.recipeDelete);
app.post('/api/menu', menuController.menuPost);
app.post('/api/menu/add', menuController.menuAddRecipePost);
app.post('/api/menu/delete', menuController.menuDeleteRecipePost);
app.delete('/api/menu/:menu', menuController.menuDelete);
app.get('/api/menu', menuController.menuGet);
app.get('/api/menu/:menu', menuController.menuGet);


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
