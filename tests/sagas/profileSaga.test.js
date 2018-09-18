import store from '../../src/store';
import {
  saveProfileOnLoginSuccess, saveProfileOnPersistLogin
} from '../../src/sagas/profileSaga';
import types from '../../src/actions/actionTypes';

describe('Testing profile saga', () => {
  it ('should take the profile and dispatch on login success', () => {
    store.dispatch({ type: `${types.LOGIN}_SUCCESS`, payload:
      { data: { user: { username: 'megame' } } }
    });
    const state = store.getState();
    const profile = state.profile.profile;
    expect(profile.username).toEqual('megame');
  });
  it ('should take the profile and dispatch on persist login action dispatch', () => {
    store.dispatch({ type: types.PERSIST_LOGIN, payload:
      { user: { username: 'yohohoho' } }
    });
    const state = store.getState();
    const profile = state.profile.profile;
    expect(profile.username).toEqual('yohohoho');
  });
});
