var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var utils = require('../models/utils');
var mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');
const Menu = mongoose.model('Menu');


/**
 * GET /api/menu
 *
 */
 module.exports.menuGet = function(req, res) {
   let menuID = req.params.menu;
   if(menuID){
     Menu
       .findOne({_id: menuID})
       .exec((err, menu) => {
         if(err){
           return res.status(401).send({msg: 'The item you were looking for does not exist'})
         }else{
           res.status(200);
           res.json(menu);
         }
       })
   } else {
     Menu
       .find()
       .select('name tags description image')
       .exec((err, menus) => {
         if(err){
           return res.status(401).send({msg: 'database error: '+ err});
         }else{
           res.status(200);
           res.json(menus);
         }
       })
   }

  //  if(menuID){
  //    Menu.find({_id: menuID}, (err, menu) => {
  //      if(err){
  //        return res.status(401).send({msg: 'The item you were looking for does not exist'})
  //      }else{
  //        res.status(200);
  //        res.json(menu[0]);
  //      }
  //    });
  //  } else {
  //    Menu.find((err, menus) => {
  //      if(err){
  //        return res.status(401).send({msg: 'database error: '+ err});
  //      }else{
  //        res.status(200);
  //        res.json(menus);
  //      }
  //    })
  //  }
 }

 /**
  * POST /api/menu/add
  *
  */
module.exports.menuAddRecipePost = (req, res) => {
  req.assert('row', 'row cannot be blank').notEmpty(); //check if it exist in array
  req.assert('col', 'col cannot be blank').notEmpty(); //check if it exists
  req.assert('recipe', 'recipe cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

 // console.log(req.body.id);
 // console.log(req.body.row);
 //If multiple entries
 let menuID = req.params.menuID;
if(Array.isArray(req.body.recipe)){
  Menu.findOne({_id: menuID})
      .then((menu, err) => {
         req.body.recipe.map((id, index) => {
           return Recipe.findOne({_id: id})
                 .then((recipe, err) => {
                   if(err){
                     utils.sendJsonResponse(res, 400, err);
                   }else{
                     let row = req.body.row[index];
                     let col = req.body.col[index]
                     menu.menu[row][col].push(recipe);
                     if(index === (req.body.recipe.length - 1)){
                       menu.save();
                       return utils.sendJsonResponse(res, 200, menu);
                     }
                   }
                 })
         });
      })
} else {//Single entry
   Menu.findOne({_id: menuID})
       .exec((err, menu) => {
         if(err) {
           utils.sendJsonResponse(res, 400, err);
         } else {
           Recipe.findOne({_id: req.body.recipe})
                 .exec((err, recipe) => {
                   if(err){
                     return utils.sendJsonResponse(res, 400, err);
                   }else{
                     menu.menu[req.body.row][req.body.col].push(recipe);
                     menu.save();
                     return utils.sendJsonResponse(res, 200, menu);
                   }
                 });
         }
       });
     }
}

/**
 * POST /api/menu/delete
 *
 */
module.exports.menuDeleteRecipePost = (req, res) => {
  req.assert('id', 'id cannot be blank').notEmpty();
  req.assert('row', 'row cannot be blank').notEmpty();
  req.assert('col', 'col cannot be blank').notEmpty();
  req.assert('index', 'recipe cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  Menu.find({_id: req.body.id}, (err, menu) => {
     if(err){
        utils.sendJsonResponse(res, 400, err);
     }else {
       menu[0].menu[req.body.row][req.body.col].splice(req.body.recipeindex, 1);
       //menu[0].menu[req.body.row][req.body.col] = newMenu;
       menu[0].save();
       utils.sendJsonResponse(res, 200, menu);
     }
   })
}


/**
 * Post /api/menu
 *
 */
 module.exports.menuPost = function(req, res){
   req.assert('name', 'name cannot be blank').notEmpty();
   //req.assert('tags', 'type cannot be blank').notEmpty();

   var errors = req.validationErrors();
   //Get the ingredients

   //TODO: Change this to handle appropriately
   if (errors) {
     return res.status(400).send(errors);
   }

   Menu.create({
      name: req.body.name.toLowerCase(),
    }, function(err, menu){
      if(err) {
        utils.sendJsonResponse(res, 400, err);
      } else {

        utils.sendJsonResponse(res, 201, menu);
      }
    })

 }

 module.exports.menuUpdate = function(req, res){
   req.assert('id', 'id cannot be blank').notEmpty();
   //req.assert('tags', 'type cannot be blank').notEmpty();

   var errors = req.validationErrors();
   //Get the ingredients

   //TODO: Change this to handle appropriately
   if (errors) {
     return res.status(400).send(errors);
   }



 }

 /**
  * Delete /menu
  *
  */
 module.exports.menuDelete = function(req, res) {
    let id = req.params.menu ;
    if(id){
      Menu
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
        "message" : "No menu"
      });
    }
 }
