import types from '../actions/actionTypes';

export const initialState = {
  isLoading: false,
  errors: {
    status: false,
    message: '',
    response: {},
  },
  userProfile: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case types.LOGOUT:
    return {
      ...state,
      userProfile: {}
    };
  case types.LOGGED_IN_USER_PROFILE:
    return {
      ...state,
      userProfile: action.payload
    };
  default:
    return state;
  }
};
