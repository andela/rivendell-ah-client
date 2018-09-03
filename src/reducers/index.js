import { combineReducers } from 'redux';
<<<<<<< HEAD
import helloWorld from './helloWorld';

export default combineReducers({
  helloWorld,
});
=======
import postReducer from './postReducer';

export default combineReducers({
  posts: postReducer,
});
>>>>>>> chore(Setup Redux): Create the appropriate folder/file structure for React/Redux workflow
