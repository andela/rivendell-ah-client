import { combineReducers } from 'redux';
import auth from './authReducer';
import profile from './profileReducer';
import redirect from './redirectReducer';
import { resetPassword, resetPasswordLink, validateResetToken }
  from './resetPasswordReducers';
import {
  articles, categories, topRated, feed, favoriteArticles,
} from './articlesReducer';

export default combineReducers({
  auth,
  profile,
  redirect,
  resetPassword,
  resetPasswordLink,
  validateResetToken,
  articles,
  categories,
  topRated,
  feed,
  favoriteArticles,
});
