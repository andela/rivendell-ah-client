import { combineReducers } from 'redux';
import auth from './authReducer';
import profile from './profileReducer';
import redirect from './redirectReducer';

export default combineReducers({
  auth,
   profile,
  redirect,
});
