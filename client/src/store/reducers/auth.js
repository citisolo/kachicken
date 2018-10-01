const initialState = {
  token: null,
  user: { id: ""},
  success: false
};

export default function auth(state = initialState, action){
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        token: action.token,
        user: action.user,
        loginSuccess: action.success
      });
    case 'SIGNUP_SUCCESS':
      return Object.assign({}, state, {
        token: action.token,
        user: action.user,
        signupSuccess: action.success
      });
    case 'SIGNUP_FAILURE':
      return Object.assign({}, state, {
        success: action.success
      })
    default:
      return state;
  }
}
