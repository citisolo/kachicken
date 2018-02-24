const express = require('express');
const indexRouter = express.Router();
const utils = require('../models/utils');
//const config = require('../config');

const User = require('../models/User');
require('../models/Ingredient');
require('../models/Recipe');
require('../models/Menu');


const userController = require('../controllers/user');
const contactController = require('../controllers/contact');
const ingredientController = require('../controllers/ingredient');
const recipeController = require('../controllers/recipe');
const menuController = require('../controllers/menu');

//Protected routes
// indexRouter.use(function(req, res, next) {
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//   //decode token
//   if(token) {
//     jwt.verify(token, config.secret, function(err, decoded){
//       if(err){
//         return utils.sendJsonResponse(res, 401, err)
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     })
//   } else {
//     return utils.sendJsonResponse(res, 401, {message: 'No token provided.'})
//   }
// });



module.exports = function (passport) {
  indexRouter.get('/api/ingredient', ingredientController.ingredientGet);
  indexRouter.get('/api/ingredient/:ingredient', ingredientController.ingredientGet);
  indexRouter.get('/api/recipe', recipeController.recipeGet);
  indexRouter.get('/api/menu', passport.authenticate('jwt', { session: false}), menuController.menuGet);
  indexRouter.get('/api/menu/:menu', menuController.menuGet);


  indexRouter.post('/api/ingredient', ingredientController.ingredientPost);
  indexRouter.delete('/api/ingredient/:ingredient', ingredientController.ingredientDelete);
  indexRouter.post('/api/rececipe/:recipe', recipeController.recipeDelete);
  indexRouter.post('/api/menu', menuController.menuPost);
  indexRouter.post('/api/menu/add', menuController.menuAddRecipePost);
  indexRouter.post('/api/menu/delete', menuController.menuDeleteRecipePost);
  indexRouter.delete('/api/menu/:menu', menuController.menuDelete);

  indexRouter.post('/api/user', userController.userPost);
  indexRouter.post('/api/login', userController.userLogin);


  indexRouter.delete('/api/user/:user',  passport.authenticate('jwt', { session: false}),  userController.userDelete);

  return indexRouter;
}

//module.exports = indexRouter;
