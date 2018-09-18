import types from '../actions/actionTypes';

export const initialState = {
  isLoading: false,
  errors: {
    status: false,
    message: '',
    response: {},
  },
  likes: [],
  like: false,
  likesCount: 0,
  successDone: null
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case types.STORE_LIKES:
    return {
      ...state,
      likes: action.payload.likes,
      likesCount: action.payload.likesCount
    };
  case `${types.LIKE_ARTICLE}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${types.LIKE_ARTICLE}_SUCCESS`: {
    return {
      ...state,
      like: true,
      successDone: true
    };
  }
  case `${types.LIKE_ARTICLE}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  case `${types.UNLIKE_ARTICLE}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${types.UNLIKE_ARTICLE}_SUCCESS`: {
    return {
      ...state,
      like: false,
    };
  }
  case `${types.UNLIKE_ARTICLE}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  default:
    return state;
  }
};
