require('./Recipe');
const mongoose = require('mongoose');

var Menu = {
  breakfast: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
  lunch: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
  snack:  { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
  dinner: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
  pudding: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]}
};

var menuFormat = new mongoose.Schema({
  row:{
    type: [String],
    enum: ["breakfast", "dinner", "dinner", "lunch", "snack"],
    // validate : {
    //   validator : function(array) {
    //     return (array.length === this.col.length) && (array.length === this.recipe.length);
    //   }
    // }
  },
  col:{
    type: [String],
    enum:["monday", "friday", "friday", "sunday", "wednesday"],
    required: true
  },
  recipe:{
    type: [],
    required: true,
    // validate: {
    //   validator: function(array){
    //     //make sure all the id's are valid
    //   }
    // }
  }
});

var menuSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  description: {type: String, default:"Some quick example text to build on the card title and make up the bulk of the card\'s content."},
  image: {type: String, default:'image.png'},
  menu: Menu,
  menuFormat: menuFormat
});

mongoose.model('MenuFormat', menuFormat);
mongoose.model('Menu', menuSchema);
