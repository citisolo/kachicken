var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var utils = require('../models/utils');
var mongoose = require('mongoose');
const Ingredient = mongoose.model('Ingredient');
const Recipe = mongoose.model('Recipe');
const IngredientEntry = mongoose.model('IngredientEntry');

/**
 * GET /recipes
 *
 */
 module.exports.recipeGet = function(req, res) {
   let rec = req.params.recipe
   if(rec){
     Recipe.find({name: recipeName}, (err, recipe) => {
       if(err){
         return res.status(401).send({msg: 'The item you were looking for does not exist'})
       }else{
         res.status(200);
         res.json(recipe[0]);
       }
     });
   } else {
     Recipe.find((err, recipes) => {
       if(err){
         return res.status(401).send({msg: 'database error: '+ err});
       }else{
         res.status(200);
         res.json(recipes);
       }
     })
   }
 }

  /**
   * Post /recipe
   *
   */
   module.exports.recipePost = function(req, res){
     req.assert('name', 'name cannot be blank').notEmpty();
     req.assert('type', 'type cannot be blank').notEmpty();
     //req.assert('lifeStyle', 'lifeStyle cannot be blank').notEmpty();
     req.assert('serves', 'serves cannot be blank').notEmpty();
     req.assert('mealtime', 'meal Time cannot be blank').notEmpty();
     req.assert('ingredients', 'ingredients cannot be blank').notEmpty();
     var errors = req.validationErrors();
     //Get the ingredients

     //TODO: Change this to handle appropriately
     if (errors) {
       return res.status(400).send(errors);
     }

     let ings = [];

     Ingredient.find({_id: {$in:req.body.ingredients}}, (err, ingredients) => {
       if(err){
         utils.sendJsonResponse(res, 400, err);
       } else {
         ingredients.map((ing, index) => {
           ings.push({
             ingredient: ing,
             unit: req.body.units[index],
             quantity:req.body.quantity[index]
           })
         })
         let recipe = new Recipe
         recipe.name = req.body.name;
         recipe.type = "req.body.type.split",
         recipe.lifeStyle = req.body.lifeStyle;
         recipe.serves = req.body.serves;
         recipe.mealTime = req.body.mealtime;
         ings.map((ing)=>{
           recipe.ingredients.push(ing);
         })
         recipe.save((err) => {
           if(err){
             utils.sendJsonResponse(res, 400, err);
           }else {
             utils.sendJsonResponse(res, 201, recipe);
           }
         });


       }
     });


    //  Recipe.create({
    //    name: req.body.name,
    //    type: "req.body.type.split",
    //    lifeStyle: req.body.lifeStyle,
    //    serves: req.body.serves,
    //    mealTime: req.body.mealtime,
    //    ingredients: ings
    //  }, (err, recipe) => {
    //    if(err){
    //      utils.sendJsonResponse(res, 400, err);
    //    }else {
    //      utils.sendJsonResponse(res, 201, recipe);
    //    }
    //  });
   }

   module.exports.recipeDelete = function(req, res) {
      let id = req.params.recipe ;
      console.log(id)
      if(id){
        Recipe
            .findByIdAndRemove(id)
            .exec(
              (err, data) => {
                if(err){
                  utils.sendJsonResponse(res, 404, err);
                  return;
                }
                utils.sendJsonResponse(res, 204, null);
              });
      }else{
        utils.sendJsonResponse(res, 404, {
          "message" : "No recipe"
        });
      }
   }
