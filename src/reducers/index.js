import { combineReducers } from 'redux';

import helloWorld from './helloWorld';
import createArticle from './createArticle';

export default combineReducers({
  helloWorld,
  createArticle
});
