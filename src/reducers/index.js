import { combineReducers } from 'redux';
import auth from './authReducer';
import redirect from './redirectReducer';
import article from './articleReducer';
import like from './likeReducer';

export default combineReducers({
  auth,
  redirect,
  article,
  like
});
