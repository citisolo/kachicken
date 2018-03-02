import { combineReducers } from 'redux';
import auth from './auth';
import mealplanner from './mealplanner';

export default combineReducers({
  auth,
  mealplanner
})
