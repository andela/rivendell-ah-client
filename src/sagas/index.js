import { all } from 'redux-saga/effects';
import { watchGetArticles, watchGetFeed, watchLogout } from './articlesSaga';
import {
  saveProfileOnLoginSuccess,
  saveProfileOnPersistLogin,
  saveProfileOnSignupSuccess,
  saveProfileOnSocialLoginSuccess,
  saveProfileOnSocialLogin,
  updateUserOnProfileUpdate,
} from './profileSaga';
import { watchUnlikeArticle } from './likeSaga';

/**
 * export all the watchers to the sagaMiddleware
 * @returns {null} null
 */
export default function* rootSaga() {
  yield all([
    saveProfileOnLoginSuccess(),
    saveProfileOnPersistLogin(),
    saveProfileOnSignupSuccess(),
    saveProfileOnSocialLoginSuccess(),
    saveProfileOnSocialLogin(),
    updateUserOnProfileUpdate(),
    watchUnlikeArticle(),
    watchGetArticles(),
    watchGetFeed(),
    watchLogout(),
  ]);
}
