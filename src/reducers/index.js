import { combineReducers } from 'redux';
import createArticleReducer from './createArticleReducer';
import loadCategoriesReducer from './loadCategoriesReducer';
import loadArticleReducer from './loadArticleReducer';
import updateArticleReducer from './updateArticleReducer';
import auth from './authReducer';
import profile from './profileReducer';
import redirect from './redirectReducer';
import {
  resetPassword,
  resetPasswordLink,
  validateResetToken
} from './resetPasswordReducers';
import article from './articleReducer';
import like from './likeReducer';
import uploadImageReducer from './uploadImageReducer';
import deleteArticleReducer from './deleteArticleReducer';
import { articleRatings, rateArticle }
  from './ratingReducer';

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
  articleRatings,
  rateArticle,
});
