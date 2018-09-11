import types from './actionTypes';

const socialLogin = user => ({
  type: types.SOCIAL_LOGIN,
  payload: {
    user
  }
});

export default {
  socialLogin,
};
