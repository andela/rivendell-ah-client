import { combineReducers } from 'redux';
import auth from './authReducer';
import profile from './profileReducer';
import redirect from './redirectReducer';
import { resetPassword, resetPasswordLink, validateResetToken }
  from './resetPasswordReducers';
import article from './articleReducer';
import like from './likeReducer';

export default combineReducers({
  auth,
  profile,
  redirect,
  resetPassword,
  resetPasswordLink,
  validateResetToken,
  article,
  like
});
