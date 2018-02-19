const express = require('express');
const indexRouter = express.Router();

const userController = require('../controllers/user');
const contactController = require('../controllers/contact');
const ingredientController = require('../controllers/ingredient');
const recipeController = require('../controllers/recipe');
const menuController = require('../controllers/menu');

indexRouter.post('/contact', contactController.contactPost);
indexRouter.put('/account', userController.ensureAuthenticated, userController.accountPut);
indexRouter.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
indexRouter.post('/signup', userController.signupPost);
indexRouter.post('/login', userController.loginPost);
indexRouter.post('/forgot', userController.forgotPost);
indexRouter.post('/reset/:token', userController.resetPost);
indexRouter.get('/unlink/:provider', userController.authGoogle);
indexRouter.get('/auth/google/callback', userController.authGoogleCallback);
indexRouter.get('/api/ingredient', ingredientController.ingredientGet);
indexRouter.get('/api/ingredient/:ingredient', ingredientController.ingredientGet);
indexRouter.post('/api/ingredient', ingredientController.ingredientPost);
indexRouter.delete('/api/ingredient/:ingredient', ingredientController.ingredientDelete);
indexRouter.post('/api/recipe', recipeController.recipePost);
indexRouter.get('/api/recipe', recipeController.recipeGet);
indexRouter.delete('/api/recipe/:recipe', recipeController.recipeDelete);
indexRouter.post('/api/menu', menuController.menuPost);
indexRouter.post('/api/menu/add', menuController.menuAddRecipePost);
indexRouter.post('/api/menu/delete', menuController.menuDeleteRecipePost);
indexRouter.delete('/api/menu/:menu', menuController.menuDelete);
indexRouter.get('/api/menu', menuController.menuGet);
indexRouter.get('/api/menu/:menu', menuController.menuGet);

module.exports = indexRouter;
