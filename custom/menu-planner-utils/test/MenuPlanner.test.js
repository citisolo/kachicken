const assert = require('assert');
const {MenuObject, MenuFormat, MenuFormatter} = require('../index.js');

formatData = {
    row:["breakfast", "dinner", "dinner", "lunch", "snack"],
    col:["monday",    "friday", "friday", "sunday", "wednesday"],
    recipe: ["59f8ccd9882fac3f9dbfa207", "59f8ccd9882fac3f9dbfa207","59f8ccd9882fac3f9dbfa207", "59f8ccd9882fac3f9dbfa207", "59f8ccd9882fac3f9dbfa207"]
  }

menuData  = {
  breakfast:
   { monday: [ '59f8ccd9882fac3f9dbfa207' ],
     tuesday: [],
     wednesday: [],
     thursday: [],
     friday: [],
     saturday: [],
     sunday: [] },
  lunch:
   { monday: [],
     tuesday: [],
     wednesday: [],
     thursday: [],
     friday: [],
     saturday: [],
     sunday: [ '59f8ccd9882fac3f9dbfa207' ] },
  snack:
   { monday: [],
     tuesday: [],
     wednesday: [ '59f8ccd9882fac3f9dbfa207' ],
     thursday: [],
     friday: [],
     saturday: [],
     sunday: [] },
  dinner:
   { monday: [],
     tuesday: [],
     wednesday: [],
     thursday: [],
     friday: [ '59f8ccd9882fac3f9dbfa207', '59f8ccd9882fac3f9dbfa207' ],
     saturday: [],
     sunday: [] },
  pudding:
   { monday: [],
     tuesday: [],
     wednesday: [],
     thursday: [],
     friday: [],
     saturday: [],
     sunday: [] } }


describe('MenuPlannerFormat', function() {
  describe('#decode', function() {
    it('it should convert MenuFormat to MenuObject', function(done){
       let Menu = MenuFormatter.decode(formatData);
       assert.equal(Menu.breakfast.monday[0], "59f8ccd9882fac3f9dbfa207");
       assert.equal(Menu.dinner.friday[0], "59f8ccd9882fac3f9dbfa207");
       assert.equal(Menu.dinner.friday[1], "59f8ccd9882fac3f9dbfa207");
       assert.equal(Menu.lunch.sunday[0], "59f8ccd9882fac3f9dbfa207");
       assert.equal(Menu.snack.wednesday[0], "59f8ccd9882fac3f9dbfa207")
       done();
    })
  });
  describe('#encode', function() {
    it('it should convert MenuObject to MenuFormat ', function(done){
       let encodedData = MenuFormatter.encode(menuData);
       let recipes = encodedData.recipe;
       for ( let key in recipes ){
         let index = formatData.recipe.indexOf(recipes[key]);
         assert(index > -1);
       }
       done();
    })
  });
})
