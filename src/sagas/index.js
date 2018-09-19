import { all } from 'redux-saga/effects';
import { watchGetArticles, watchGetFeed, watchLogout } from './articlesSaga';
import {
  saveProfileOnLoginSuccess, saveProfileOnPersistLogin
} from './profileSaga';

/**
 * export all the watchers to the sagaMiddleware
 * @returns {null} null
 */
export default function* rootSaga() {
  yield all([
    saveProfileOnLoginSuccess(),
    saveProfileOnPersistLogin(),
    watchGetArticles(),
    watchGetFeed(),
    watchLogout(),
  ]);
}
