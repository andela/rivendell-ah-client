import { combineReducers } from 'redux';

import helloWorld from './helloWorld';
import postReducer from './postReducer';

export default combineReducers({
  posts: postReducer,
  helloWorld,
});
