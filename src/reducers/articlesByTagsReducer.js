import types from '../actions/actionTypes';

export const initialState = {
  isLoading: false,
  errors: {
    status: false,
    message: '',
    response: {},
  },
  articles: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.GET_ARTICLES_BY_TAGS}_LOADING`:
    return {
      ...state,
      isLoading: true
    };
  case `${types.GET_ARTICLES_BY_TAGS}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      articles: action.payload.data.articles || [],
      count: action.payload.data.articlesCount || 0,
    };
  case `${types.GET_ARTICLES_BY_TAGS}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        status: true,
        message: '',
        response: action.payload,
      },
    };
  default:
    return state;
  }
};
