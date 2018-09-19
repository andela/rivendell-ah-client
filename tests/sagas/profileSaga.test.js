import store from '../../src/store';
import types from '../../src/actions/actionTypes';

describe('Testing profile saga', () => {
  it ('should take the profile and dispatch on login success', () => {
    store.dispatch({ type: `${types.LOGIN}_SUCCESS`, payload:
      { data: { user: { username: 'megame' } } }
    });
    const state = store.getState();
    const profile = state.profile.userProfile;
    expect(profile.username).toEqual('megame');
  });
  it ('should take the profile and dispatch on login success', () => {
    store.dispatch({ type: `${types.SIGN_UP}_SUCCESS`, payload:
      { data: { user: { username: 'megame1' } } }
    });
    const state = store.getState();
    const profile = state.profile.userProfile;
    expect(profile.username).toEqual('megame1');
  });
  it ('should take the profile and dispatch on login success', () => {
    store.dispatch({ type: types.SOCIAL_LOGIN, payload:
      {  user: { username: 'megame2', token: 'token'  } }
    });
    const state = store.getState();
    const profile = state.profile.userProfile;
    expect(profile.username).toEqual('megame2');
  });
  it ('should take the profile and dispatch on persist login action dispatch', () => {
    store.dispatch({ type: types.PERSIST_LOGIN, payload:
      { user: { username: 'yohohoho' } }
    });
    const state = store.getState();
    const profile = state.profile.userProfile;
    expect(profile.username).toEqual('yohohoho');
  });
  it ('should take the profile and dispatch on profile update action dispatch', () => {
    store.dispatch({ type: `${types.PROFILE_UPDATE}_SUCCESS`, payload:
      { data: {user: { username: 'yohohoho' } } }
    });
    const state = store.getState();
    const profile = state.profile.userProfile;
    expect(profile.username).toEqual('yohohoho');
  });
  it ('should take the profile and dispatch on social login action dispatch', () => {
    store.dispatch({ type: `${types.SOCIAL_LOGIN}_SUCCESS`, payload:
      { user: { username: 'yohohoho' } }
    });
    const state = store.getState();
    const profile = state.profile.userProfile;
    expect(profile.username).toEqual('yohohoho');
  });
});
