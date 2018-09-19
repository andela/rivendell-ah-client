import { take, takeEvery, put } from 'redux-saga/effects';
import types from '../actions/actionTypes';

/**
 * @param {Object} action action
 * @returns {null} null
 */
function* saveProfileOnLoginSuccess(action) {
  const {
    bio, email, firstName, id, image, lastName, username, verified
  } = action.payload.data.user;
  const user = {
    bio, email, firstName, id, image, lastName, username, verified
  };
  yield put({ type: types.LOGGED_IN_USER_PROFILE, payload: user });
}

/**
 * @returns {null} null
 */
export function* watchLoginSuccess() {
  yield takeEvery(`${types.LOGIN}_SUCCESS`, saveProfileOnLoginSuccess);
}

/**
 * @param {Object} action action
 * @returns {null} null
 */
export function* saveProfileOnSignupSuccess(action) {
  const {
    bio, email, firstName, id, image, lastName, username, verified
  } = action.payload.data.user;
  const user = {
    bio, email, firstName, id, image, lastName, username, verified
  };
  yield put({ type: types.LOGGED_IN_USER_PROFILE, payload: user });
}

/**
 * @returns {null} null
 */
export function* watchSignupSuccess() {
  yield takeEvery(`${types.SIGN_UP}_SUCCESS`, saveProfileOnSignupSuccess);
}

/**
 * @param {Object} action action
 * @returns {null} null
 */
export function* saveProfileOnSocialLogin(action) {
  const {
    bio, email, firstName, id, image, lastName, username, verified
  } = action.payload.user;
  const user = {
    bio, email, firstName, id, image, lastName, username, verified
  };
  yield put({ type: types.LOGGED_IN_USER_PROFILE, payload: user });
}

/**
 * @returns {null} null
 */
export function* watchSocialLogin() {
  yield takeEvery(types.SOCIAL_LOGIN, saveProfileOnSocialLogin);
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
export function* updateUserOnProfileUpdate() {
  const getUserDetails = yield take(`${types.PROFILE_UPDATE}_SUCCESS`);
  let userDetails = getUserDetails.payload.data.user;
  userDetails = JSON.stringify(userDetails);
  localStorage.setItem('user', userDetails);
}

/**
 * @returns {null} null
 */
export function* watchProfileUpdate() {
  yield takeEvery(`${types.PROFILE_UPDATE}_SUCCESS`, updateUserOnProfileUpdate);
}

export default {};
