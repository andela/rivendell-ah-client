import types from '../actions/actionTypes';

export const initialState = {
  isLoading: false,
  errors: {
    status: false,
    message: '',
    response: {},
  },
  redirectUrl: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case types.SOCIAL_LOGIN_REDIRECT:
    return {
      ...state,
      redirectUrl: action.payload,
    };
  default:
    return state;
  }
};
