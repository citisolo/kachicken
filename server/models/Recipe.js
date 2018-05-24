const ingredientSchema = require('./Ingredient');
var mongoose = require('mongoose');

let ingredientEntrySchema = new mongoose.Schema({
  ingredient: [ingredientSchema],
  unit: String,
  quantity: Number
});

var recipeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: String,
  type: String,
  lifeStyle:[String],
  ingredients:[],
  serves: Number,
  mealTime:String
});

mongoose.model('IngredientEntry', ingredientEntrySchema);
mongoose.model('Recipe', recipeSchema);
