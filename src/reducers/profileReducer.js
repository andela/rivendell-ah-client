import types from '../actions/actionTypes';

export const initialState = {
  isLoading: false,
  errors: {
    status: false,
    message: '',
    response: {},
  },
  profile: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case types.LOGOUT:
    return {
      ...state,
      profile: {}
    };
  case types.LOGGED_IN_USER_PROFILE:
    return {
      ...state,
      profile: action.payload
    };
  default:
    return state;
  }
};
