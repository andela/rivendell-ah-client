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
import article from './articleReducer';
import like from './likeReducer';
import deleteArticleReducer from './deleteArticleReducer';
import {
  featuredArticles, categories, topRated, feed, favoriteArticles,
} from './homepageReducer';

export default combineReducers({
  auth,
  profile,
  redirect,
  resetPassword,
  resetPasswordLink,
  validateResetToken,
  article,
  like,
  createArticleReducer,
  loadCategoriesReducer,
  loadArticleReducer,
  uploadImageReducer,
  updateArticleReducer,
  deleteArticleReducer,
  featuredArticles,
  categories,
  topRated,
  feed,
  favoriteArticles,
});
