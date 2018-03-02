const initialState = {
  token: null,
  user: {}
};

export default function auth(state = initialState, action){
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return Object.assign({}, state, {
        token: action.token,
        user: action.user
      });
    default:
      return state;
  }
}
