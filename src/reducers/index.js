import { combineReducers } from 'redux';
import createArticleReducer from './createArticleReducer';
import loadCategoriesReducer from './loadCategoriesReducer';
import loadArticleReducer from './loadArticleReducer';
import uploadImageReducer from './uploadImageReducer';
import updateArticleReducer from './updateArticleReducer';
import auth from './authReducer';
import profile from './profileReducer';
import redirect from './redirectReducer';
import { resetPassword, resetPasswordLink, validateResetToken }
  from './resetPasswordReducers';

export default combineReducers({
  auth,
  profile,
  redirect,
  createArticleReducer,
  loadCategoriesReducer,
  loadArticleReducer,
  uploadImageReducer,
  updateArticleReducer,
  resetPassword,
  resetPasswordLink,
  validateResetToken,
});
