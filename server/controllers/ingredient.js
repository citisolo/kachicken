var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var mongoose = require('mongoose');
var Ingredient = mongoose.model('Ingredient');
var utils = require('../models/utils');

/**
 * GET /ingredient
 *
 */
module.exports.ingredientGet = function(req, res) {
  let ing = req.params.ingredient;
  if (ing){
    Ingredient.find({name: ing}, (err, ingredient) => {
      if(!ingredient){
        return res.status(401).send({msg: 'The item you were looking for does not exist'})
      }else{
        res.status(200);
        res.json(ingredient);
      }
    });
  } else {
    Ingredient.find((err, ingredients) => {
      if(err){
        return res.status(401).send({msg: 'database error: ' + err});
      }else{
        res.status(200);
        res.json(ingredients);
      }
    })
  }
}

/**
 * POST /ingredient
 *
 */
 module.exports.ingredientPost = function(req, res) {
   //Assertions for validation
  req.assert('name', 'Name cannot be blank');
  console.log(req.body.name);
  if(!req.body.name){
      return res.status(401).send({msg: 'Name cannot be blank'})
  }else{
    Ingredient.create({
       name: req.body.name.toLowerCase()
     }, function(err, ingredient){
       if(err) {
         utils.sendJsonResponse(res, 400, err);
       } else {
         utils.sendJsonResponse(res, 201, ingredient);
       }
     })
  }

 }

 /**
  * DELETE /ingredient
  *
  */
  module.exports.ingredientDelete = (req,res) => {
    console.log(req.params.ingredient)
    let id =  req.params.ingredient;
    if(id){
      Ingredient
              .findByIdAndRemove(id)
              .exec (
                (err, data) => {
                  if(err){
                    utils.sendJsonResponse(res, 404, err );
                    return;
                  }
                  utils.sendJsonResponse(res, 204, null);
                });
    }else{
      utils.sendJsonResponse(res, 404, {
        "message" : "No ingredient id"
      });
    }
  }
