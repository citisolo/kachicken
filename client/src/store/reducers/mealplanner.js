
import { getMenu, getRecipe } from '../actions/mealplanner'
const initialState = {
  getMenu: getMenu,
  getRecipe: getRecipe,
  ingredients: [],
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
    case "GETINGREDIENT_SUCCESS":
      return Object.assign({}, state, {
        ingredient: action.payload
      })
    case "GETINGREDIENTS_SUCCESS":
      return Object.assign({}, state, {
        ingredients: action.payload
      })
    case "SAVEINGREDIENT_SUCCESS":
      return Object.assign({}, state, {
        saveIngredientSuccess: action.payload
      })
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
    case "GETRECIPE_FAILURE":
    case "GETINGREDIENTS_FAILURE":
    case "GETINGREDIENT_FAILURE":
    case "SAVEINGREDIENT_FAILURE":
    default:
     return state;
  }
}
