
//const host = 'https://localhost:3080/api/';
//const host = '/';
const menuAPI = '/api/Menus/';
const recipeAPI = '/api/Recipes/';
const ingredientAPI = '/api/Ingredients/';



export function getIngredient(id, cb){
  let url = ingredientAPI + id;
  return request( url,
                 {method: 'GET'},
                 (json) => {
                   return {
                     type: 'GETINGREDIENT_SUCCESS',
                     payload: json
                   }
                 },
                 (json) => {
                   return {
                     type: 'GETINGREDIENT_FAILURE'
                   }
                 },
                 cb);
}
export function getIngredients(cb){
  return request(ingredientAPI,
                 {method: 'GET'},
                 (json) => {
                   return {
                     type: 'GETINGREDIENTS_SUCCESS',
                     payload: json
                   }
                 },
                 (json) => {
                   return {
                     type: 'GETINGREDIENTS_FAILURE',
                   }
                 },
                 cb)
}
export function saveIngredient(name, cb){
  console.log(name);
  var formData = new FormData();
  formData.append( "json", JSON.stringify({ "name": name}));
  return request(ingredientAPI,
                 {
                   method: 'post',
                   headers: { 'Content-Type': 'application/json', 'origin' : 'http://localhost:3000' },
                   body: JSON.stringify({
                     name: name,
                   })
                 },
                 (json) => {
                   return {
                     type: 'INGREDIENT_SAVE_SUCCESS',
                     payload: json
                   }
                 },
                 (json) => {
                   return {
                     type: 'INGREDIENT_SAVE_FAILURE'
                   }
                 },
                 cb);
}



export function getMenus() {
  return (dispatch) => {
    return fetch(menuAPI,  {
      method: 'GET'
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json()
                       .then((json) => {
                         dispatch({
                           type: 'GETMENUS_SUCCESS',
                           payload: json
                         });
                       });
      } else {
        return response.json()
                       .then((json) => {
                         dispatch({
                           type: 'MENU_ERROR'
                         });
                       });
      }
    });
  }
}

export function getMenu(menuID){
  return (dispatch) => {
    const url = menuAPI + menuID;
    return fetch(url, { method: 'GET' })
          .then((response) => {
            console.log(response);
              if (response.ok) {
                return response.json()
                               .then((json) => {
                                  dispatch({
                                    type: 'GETMENU_SUCCESS',
                                    payload: json
                                  });
                               });
              }else {
                return response.json()
                               .then((json) => {
                                 dispatch({
                                   type: 'MENU_ERROR',
                                 });
                               });
              }
            });
  }
}

export function getRecipe(recipeID){
  return (dispatch) => {
    const url = recipeAPI + recipeID;
    return fetch(url, { method: 'GET' })
          .then((response) => {
              if (response.ok) {
                return response.json()
                               .then((json) => {
                                  dispatch({
                                    type: 'GETRECIPE_SUCCESS',
                                    payload: json
                                  });
                               });
              }else {
                return response.json()
                               .then((json) => {
                                 dispatch({
                                   type: 'RECIPE_ERROR',
                                 });
                               });
              }
            });
  }
}

function request(api, header, successDispatch, failureDispatch, cb){
    return (dispatch) => {
      return fetch(api, header)
      .then((response) => {
        if(typeof cb  === 'function' ){
          cb(response);
        }
        if(response.ok) {
          return response.json()
                         .then((json) => {
                           dispatch(successDispatch(json));
                         });
        } else {
          return response.json()
                         .then((json) => {
                           dispatch(failureDispatch(json));
                         })
        }
      })
  }
}
