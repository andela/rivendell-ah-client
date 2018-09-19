import types from '../actions/actionTypes';

export const initialState = {
  isLoading: false,
  errors: {
    status: false,
    message: '',
    response: {},
  },
  article: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.GET_ARTICLE}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${types.GET_ARTICLE}_SUCCESS`:
    return {
      ...state,
      article: action.payload.data.article,
    //   likes: action.payload.data.article.likes
    };
  case `${types.GET_ARTICLE}_FAILURE`:
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
