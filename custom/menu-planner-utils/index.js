class MenuObject {
  constructor(){
    this.breakfast = { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
    this.lunch = { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
    this.snack = { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
    this.dinner = { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
    this.pudding = { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]}
  }
}

class MenuFormat {
  constructor(){
    this.row = [];
    this.col = [];
    this.recipe =[];
  }

  pushItem(row, col, item){
    this.row.push(row);
    this.col.push(col);
    this.recipe.push(item);
  }

  // remove(array, ){
  //   return array.filter(e => e !== )
  // }
  //
  // removeItem(itemIndex){
  //   let index = this.recipe.indexOf(item);
  //   if(index == -1){
  //     return false;
  //   }
  //   let newRecipeArray = this.recipe.
  // }
}

class MenuFormatter {

  static encode(menuObject){
    let res = new MenuFormat()
    for(let row in menuObject){
      for(let col in menuObject[row]){
        let data = menuObject[row][col];
        if(data.length > 0){
          for(let item in data){
            res.pushItem(row, col, data[item]);
          }
        }
      }
    }
    return res;
  }

  static decode(format) {
    let menu = new MenuObject();
    for(let key in format.row){
      let row = format.row[key];
      let col = format.col[key];
      let val = format.recipe[key];
      menu[row][col].push(val);
    }
    return menu

  }
}

module.exports = {
  MenuObject: MenuObject,
  MenuFormat: MenuFormat,
  MenuFormatter: MenuFormatter
}
