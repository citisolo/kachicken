
//const host = 'https://localhost:3080/api/';
//const host = '/';
const menuAPI = '/api/Menus/';
const recipeAPI = '/api/Recipes/';

export function getMenus() {
  return (dispatch) => {
    return fetch(menuAPI,  {
      method: 'GET'
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        console.log(response);
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
