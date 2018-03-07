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
  indexRouter.get('/api/recipe/:recipe', recipeController.recipeGet);
  indexRouter.get('/api/menu', menuController.menuGet);
  indexRouter.get('/api/menu/:menu', menuController.menuGet);

  indexRouter.post('/api/ingredient', ingredientController.ingredientPost);
  indexRouter.post('/api/recipe', recipeController.recipePost);
  indexRouter.post('/api/menu', menuController.menuPost);
  indexRouter.post('/api/menu/add/:menuID', menuController.menuAddRecipePost);
  indexRouter.post('/api/menu/delete', menuController.menuDeleteRecipePost);
  indexRouter.post('/api/user', userController.userPost);
  indexRouter.post('/api/login', userController.userLogin);

  indexRouter.delete('/api/ingredient/:ingredient', ingredientController.ingredientDelete);
  indexRouter.delete('/api/recipe/:recipe', recipeController.recipeDelete);
  indexRouter.delete('/api/menu/:menu', menuController.menuDelete);
  indexRouter.delete('/api/user',  passport.authenticate('jwt', { session: false}),  userController.userDelete);

  return indexRouter;
}

//module.exports = indexRouter;
