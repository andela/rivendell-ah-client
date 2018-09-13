import { all } from 'redux-saga/effects';
import {
  saveProfileOnLoginSuccess, saveProfileOnPersistLogin,
  saveProfileOnSignupSuccess, saveProfileOnSocialLoginSuccess
} from './profileSaga';

/**
 * export all the watchers to the sagaMiddleware
 * @returns {null} null
 */
export default function* rootSaga() {
  yield all([
    saveProfileOnLoginSuccess(),
    saveProfileOnPersistLogin(),
    saveProfileOnSignupSuccess(),
    saveProfileOnSocialLoginSuccess()
  ]);
}
