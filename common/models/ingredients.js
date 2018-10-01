'use strict';

module.exports = function(ingredients) {
   //console.log(ingredients);

   ingredients.observe('access', function(ctx, next){

     next();
   })
};
