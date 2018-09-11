import types from '../actions/actionTypes';

export const initialState = {
  isLoading: false,
  errors: {
    status: false,
    message: '',
    response: {},
  },
  userProfile: {},
  redirect: false,
};

const profile = (state = initialState, action = {}) => {
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
  case `${types.PROFILE}_LOADING`: {
    return {
      ...state,
      isLoading: true,
    };
  }
  case `${types.PROFILE_UPDATE}_LOADING`: {
    return {
      ...state,
      isLoading: true,
    };
  }
  case `${types.PROFILE}_SUCCESS`: {
    return {
      ...state,
      isLoading: false,
      errors: {
        status: false,
        message: '',
        response: {},
      },
      profile: action.payload.data.profile,
    };
  }
  case types.UPDATE_REDIRECT: {
    return {
      ...state,
      isLoading: false,
      redirect: false,
    };
  }
  case `${types.PROFILE_UPDATE}_SUCCESS`: {
    return {
      ...state,
      isLoading: false,
      redirect: true,
      errors: {
        status: false,
        message: '',
        response: {},
      },
      userProfile: action.payload.data.user,
    };
  }
  case `${types.PROFILE}_FAILURE`: {
    return {
      ...state,
      isLoading: false,
      errors: {
        status: true,
        message: action.payload.message,
        response: action.payload.response,
      },
    };
  }
  case `${types.PROFILE_UPDATE}_FAILURE`: {
    return {
      ...state,
      isLoading: false,
      errors: {
        status: true,
        message: action.payload.message,
        response: action.payload.response,
      },
    };
  }
  default:
    return state;
  }
};

export default profile;
