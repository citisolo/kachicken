var mongoose = require('mongoose');

// const Ingredient_Category = {
//     FRESH_FRUIT: [],
//     FRESH_VEGETABLES_SALAD: 1,
//     MEAT_SEAFOOD: 2,
//     DAIRY_CHEESE_EGGS: 3,
//     BREAD_BAKERY:4,
//     READY_MEALS_PIZZAS_PIES:5,
//     BISCUITS_SNACKS_CRISPS:6,
//     COFFEE_TEA_DRINKS:7,
//     BEER_WINE_SPIRITS:8 }
//
// const freshFruit = [
//   BANANAS,
//   BERRie
// ]
// const ingredientType = new mongoose.Schema({
//   type:
// })
var ingredientSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: String,
});

mongoose.model('Ingredient', ingredientSchema);
