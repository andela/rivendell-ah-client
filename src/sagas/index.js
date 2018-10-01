import { all } from 'redux-saga/effects';
import { watchGetArticles, watchGetFeed, watchLogout } from './articlesSaga';
import {
  watchLoginSuccess,
  saveProfileOnPersistLogin,
  watchSignupSuccess,
  watchSocialLogin,
  updateUserOnProfileUpdate,
} from './profileSaga';

/**
 * export all the watchers to the sagaMiddleware
 * @returns {null} null
 */
export default function* rootSaga() {
  yield all([
    watchLoginSuccess(),
    saveProfileOnPersistLogin(),
    watchSignupSuccess(),
    watchSocialLogin(),
    updateUserOnProfileUpdate(),
    watchGetArticles(),
    watchGetFeed(),
    watchLogout(),
  ]);
}
