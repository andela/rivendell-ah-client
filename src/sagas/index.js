import { all } from 'redux-saga/effects';
import { watchGetArticles, watchGetFeed, watchLogout } from './articlesSaga';
import {
  watchLoginSuccess,
  saveProfileOnPersistLogin,
  watchSignupSuccess,
  watchSocialLogin,
  watchProfileUpdate,
} from './profileSaga';
import { watchUnlikeArticle } from './likeSaga';

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
    watchProfileUpdate(),
    watchUnlikeArticle(),
    watchGetArticles(),
    watchGetFeed(),
    watchLogout(),
  ]);
}
