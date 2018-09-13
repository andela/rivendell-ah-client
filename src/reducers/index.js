import { combineReducers } from 'redux';

import helloWorld from './helloWorld';
import createArticleReducer from './createArticleReducer';
import loadCategoriesReducer from './loadCategoriesReducer';

export default combineReducers({
  helloWorld,
  createArticleReducer,
  loadCategoriesReducer
});
