import { combineReducers } from 'redux';

import helloWorld from './helloWorld';
import createArticle from './createArticle';
import loadCategories from './loadCategories';

export default combineReducers({
  helloWorld,
  createArticle,
  loadCategories
});
