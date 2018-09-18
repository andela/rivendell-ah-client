import { all } from 'redux-saga/effects';

/**
 * export all the watchers to the sagaMiddleware
 * @returns {null} null
 */
export default function* rootSaga() {
  yield all([]);
}
