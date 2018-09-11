import types from '../actions/actionTypes';

export const initialState = {
  isLoading: false,
  errors: {
    status: false,
    message: '',
    response: {},
  },
  token: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case types.SOCIAL_LOGIN:
    return {
      ...state,
      token: action.payload.user.token,
    };
  default:
    return state;
  }
};
