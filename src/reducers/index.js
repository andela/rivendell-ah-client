import { combineReducers } from 'redux';
import createArticleReducer from './createArticleReducer';
import loadCategoriesReducer from './loadCategoriesReducer';

export default combineReducers({
  createArticleReducer,
  loadCategoriesReducer
});
