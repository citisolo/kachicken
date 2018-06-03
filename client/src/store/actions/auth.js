const userLoginApi = 'https://localhost:3080/api/login';
const userSignupApi = 'https://localhost:3080/api/user';

export function login(email, password){
  return (dispatch) => {
    return fetch(userLoginApi, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        logemail: email,
        logpassword: password
      })
    }).then((response) => {
      console.log(response)
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            token: json.token,
            user: json.user,
            success: true
          });
          // browserHistory.push('/');
          // cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type:'LOGIN_FAILURE',
            success: false
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
      headers: { 'Content-Type': 'application/json', 'origin' : 'http://localhost:3000' },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
        passwordConf:passwordConf })
    }).then((response) => {
      return response.json().then((json) => {
        console.log(response);
        if (response.ok) {
          dispatch({
            type: 'SIGNUP_SUCCESS',
            token: json.token,
            user: json.user,
            success: true
          });
          // browserHistory.push('/');
          // cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
        } else {
          dispatch({
            type: 'SIGNUP_FAILURE',
            messages: Array.isArray(json) ? json : [json],
            success: false
          });
        }
      });
    });
  };
}
