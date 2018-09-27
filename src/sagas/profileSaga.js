import { take, put } from 'redux-saga/effects';
import types from '../actions/actionTypes';

/**
 * @returns {null} null
 */
export function* saveProfileOnLoginSuccess() {
  const loginSuccessAction = yield take(`${types.LOGIN}_SUCCESS`);
  const {
    bio, email, firstName, id, image, lastName, username, verified
  } = loginSuccessAction.payload.data.user;
  const user = {
    bio, email, firstName, id, image, lastName, username, verified
  };
  yield put({ type: types.LOGGED_IN_USER_PROFILE, payload: user });
}

/**
 * @returns {null} null
 */
export function* saveProfileOnSignupSuccess() {
  const signupSuccessAction = yield take(`${types.SIGN_UP}_SUCCESS`);
  const {
    bio, email, firstName, id, image, lastName, username, verified
  } = signupSuccessAction.payload.data.user;
  const user = {
    bio, email, firstName, id, image, lastName, username, verified
  };
  yield put({ type: types.LOGGED_IN_USER_PROFILE, payload: user });
}

/**
 * @returns {null} null
 */
export function* saveProfileOnSocialLoginSuccess() {
  const socialLoginSuccessAction = yield take(types.SOCIAL_LOGIN);
  const {
    bio, email, firstName, id, image, lastName, username, verified
  } = socialLoginSuccessAction.payload.user;
  const user = {
    bio, email, firstName, id, image, lastName, username, verified
  };
  yield put({ type: types.LOGGED_IN_USER_PROFILE, payload: user });
}

/**
 * @returns {null} null
 */
export function* saveProfileOnPersistLogin() {
  const persistLoginAction = yield take(types.PERSIST_LOGIN);
  yield put({
    type: types.LOGGED_IN_USER_PROFILE, payload: persistLoginAction.payload.user
  });
}

/**
 * @returns {null} null
 */
export function* saveProfileOnSocialLogin() {
  const persistLoginAction = yield take(types.SOCIAL_LOGIN);
  yield put({
    type: types.LOGGED_IN_USER_PROFILE, payload: persistLoginAction.payload.user
  });
}

/**
 * @returns {null} null
 */
export function* updateUserOnProfileUpdate() {
  const getUserDetails = yield take(`${types.PROFILE_UPDATE}_SUCCESS`);
  let userDetails = getUserDetails.payload.data.user;
  userDetails = JSON.stringify(userDetails);
  localStorage.setItem('user', userDetails);
}

export default {};
