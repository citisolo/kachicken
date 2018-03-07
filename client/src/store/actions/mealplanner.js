
const host = 'https://localhost:3080/api/';

export function getMenus() {
  return (dispatch) => {
    return fetch( host  + 'menu',  {
      method: 'GET'
    }).then((response) => {
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
    const url = host + 'menu/' + menuID;
    return fetch(url, { method: 'GET' })
          .then((response) => {
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
    const url = host + 'recipe/' + recipeID;
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
