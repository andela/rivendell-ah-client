import types from './actionTypes';

const socialLoginRedirect = redirectUrl => ({
  type: types.SOCIAL_LOGIN_REDIRECT,
  payload: redirectUrl
});

export default {
  socialLoginRedirect,
};
