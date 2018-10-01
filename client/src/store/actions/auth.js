// const userLoginApi = 'https://localhost:3080/api/login';
// const userSignupApi = 'https://localhost:3080/api/user';
const userLoginApi = '/api/Users/login/';
const userSignupApi = '/api/Users/';

export function login(email, password, cb){
  return (dispatch) => {
    return fetch(userLoginApi, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then((response) => {
      cb(response);
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            token: json.token,
            user: json,
            loginSuccess: true
          });
          // browserHistory.push('/');
          // cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type:'LOGIN_FAILURE',
            loginSuccess: false
          });
        });
      }
    })
  }
}

export function signup(name, email, password, passwordConf, cb) {
  return (dispatch) => {
    return fetch(userSignupApi, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', 'origin' : 'http://localhost:3000' },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
      })
    }).then((response) => {
      return response.json().then((json) => {
        cb(response);
        if (response.ok) {
          dispatch({
            type: 'SIGNUP_SUCCESS',
            user: json,
            signupSuccess: true
          });
          // browserHistory.push('/');
          // cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
        } else {
          dispatch({
            type: 'SIGNUP_FAILURE',
            messages: Array.isArray(json) ? json : [json],
            signupSuccess: false
          });
        }
      });
    });
  };
}
