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
export function* saveProfileOnPersistLogin() {
  const persistLoginAction = yield take(types.PERSIST_LOGIN);
  yield put({
    type: types.LOGGED_IN_USER_PROFILE, payload: persistLoginAction.payload.user
  });
}

export default {};
