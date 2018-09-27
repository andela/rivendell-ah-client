import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers';
import errorMiddleware from './middleware/errorMiddleware';
import rootSaga from './sagas';
import authMiddleware from './middleware/authMiddleware';

const promiseTypeSuffixes = ['LOADING', 'SUCCESS', 'FAILURE'];
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  thunk, errorMiddleware, authMiddleware,
  promiseMiddleware({ promiseTypeSuffixes }), sagaMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger({ collapsed: true }));
}
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
