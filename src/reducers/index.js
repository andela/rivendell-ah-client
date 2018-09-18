import { combineReducers } from 'redux';
import auth from './authReducer';
import profile from './profileReducer';

export default combineReducers({
  auth,
  profile,
});
