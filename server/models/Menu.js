const recipeSchema = require('./Recipe');
const mongoose = require('mongoose');

var Menu = {
  breakfast: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
  lunch: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
  snack:  { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
  dinner: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
  pudding: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]}
};

var menuSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  menu: Menu
});

mongoose.model('Menu', menuSchema);
