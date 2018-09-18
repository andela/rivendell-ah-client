import { all, put, take } from 'redux-saga/effects';
import types from '../actions/actionTypes';

// Our worker Saga: will perform the async increment task
// export function* getArticle() {
//   console.log('yo');
// }

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchLikeAction() {
  // yield takeEvery(`${types.LIKE_ARTICLE}_SUCCESS`, getArticle)
  yield take(`${types.LIKE_ARTICLE}_SUCCESS`);
  yield put({ type: 'TESTING' });
}

/**
 * export all the watchers to the sagaMiddleware
 * @returns {null} null
 */
export default function* rootSaga() {
  yield all([
    watchLikeAction()
  ]);
}
