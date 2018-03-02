
const host = 'https://localhost:3080/api/';

export function getMenus() {
  return (dispatch) => {

    return fetch('https://localhost:3080/api/menu',  {
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
    const url = host + 'menu/' + menuID;
    console.log(url);
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
