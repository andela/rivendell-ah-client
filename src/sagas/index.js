import { delay } from 'redux-saga';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import types from '../actions/actionTypes';

/**
 * worker saga, performs the operation of sending hello
 * world to redux store in this case
 * @returns {null} null
 */
function* helloSagaAsync() {
  yield call(delay, 2000);
  yield put({
    type: `${types.SAGA_WORLD}_SUCCESS`,
    payload: 'Hello from redux saga'
  });
}

/**
 * watcher saga, calls helloSagaAsync on each despatch action
 * matching ${HELLO_WORLD}_ASYNC
 * @returns {null} null
 */
function* helloSagaWatcher() {
  yield takeEvery(`${types.SAGA_WORLD}`, helloSagaAsync);
}

/**
 * export all the watchers to the sagaMiddleware
 * @returns {null} null
 */
export default function* rootSaga() {
  yield all([
    helloSagaWatcher(),
  ]);
}
