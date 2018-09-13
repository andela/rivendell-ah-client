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
  case types.LOGOUT:
    return {
      ...state,
      token: ''
    };
  case types.PERSIST_LOGIN:
    return {
      ...state,
      token: action.payload.token,
    };
  case types.CLEAR_API_VALIDATION_ERR:
    return {
      ...state,
      errors: {
        ...state.errors,
        response: {
          ...state.errors.response,
          [action.payload]: ''
        },
      }
    };
  case types.CLEAR_ALL_API_VALIDATION_ERRS:
    return {
      ...state,
      errors: {
        message: '',
        response: {},
      }
    };
  case `${types.LOGIN}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${types.LOGIN}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      token: action.payload.token,
    };
  case `${types.LOGIN}_FAILURE`: {
    return {
      ...state,
      isLoading: false,
      errors: {
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  }
  case types.SOCIAL_LOGIN:
    return {
      ...state,
      token: action.payload.user.token,
    };
  case `${types.SIGN_UP}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${types.SIGN_UP}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      token: action.payload.token,
    };
  case `${types.SIGN_UP}_FAILURE`: {
    return {
      ...state,
      isLoading: false,
      errors: {
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  }
  default:
    return state;
  }
};
