require('./Recipe');
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
  description: {type: String, default:"Some quick example text to build on the card title and make up the bulk of the card\'s content."},
  image: {type: String, default:'image.png'},
  menu: Menu
});

mongoose.model('Menu', menuSchema);
