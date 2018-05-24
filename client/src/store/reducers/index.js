import { combineReducers } from 'redux';
import auth from './auth';
import mealplanner from './mealplanner';
import localstorage from './localstorage';
import windowObject from './windowObject';

export default combineReducers({
  auth,
  mealplanner,
  localstorage,
  windowObject
})
