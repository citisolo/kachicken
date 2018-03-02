const userLoginApi = 'https://localhost:3080/api/user';
const userSignupApi = 'https://localhost:3080/api/login';

export function login(email, password){
  return (dispatch) => {
    return fetch(userLoginApi, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            token: json.token,
            user: json.user
          });
          // browserHistory.push('/');
          // cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type:'LOGIN_FAILURE',
          });
        });
      }
    })
  }
}

export function signup(name, email, password, passwordConf) {
  return (dispatch) => {
    return fetch(userSignupApi, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, password: password,  passwordConf:password })
    }).then((response) => {
      return response.json().then((json) => {
        if (response.ok) {
          dispatch({
            type: 'SIGNUP_SUCCESS',
            token: json.token,
            user: json.user
          });
          // browserHistory.push('/');
          // cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
        } else {
          dispatch({
            type: 'SIGNUP_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        }
      });
    });
  };
}
