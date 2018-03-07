const initialState = {
  menus: [],
  selectedMenu: {
    dummy: true,
    menu:{
      breakfast: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
      lunch: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
      snack:  { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
      dinner: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]},
      pudding: { monday: [], tuesday:[], wednesday: [], thursday: [], friday: [], saturday:[], sunday:[]}
    },
    menuFormat: {
      row:[],
      col:[],
      recipe: []
    }
  },
}

export default function mealplanner(state=initialState, action){
  switch(action.type){
    case "GETMENUS_SUCCESS":
      return Object.assign({}, state, {
        menus: action.payload
      });
    case "GETMENU_SUCCESS":
      return Object.assign({}, state, {
        selectedMenu: action.payload
      });
    case "GETRECIPE_SUCCESS":
      return Object.assign({}, state, {
        recipes: action.payload
      })
    case "GETMENUS_FAILURE":
    default:
     return state;
  }
}
