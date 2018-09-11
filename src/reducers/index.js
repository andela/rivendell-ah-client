import { combineReducers } from 'redux';
import auth from './authReducer';
import redirect from './redirectReducer';

export default combineReducers({
  auth,
  redirect
});
