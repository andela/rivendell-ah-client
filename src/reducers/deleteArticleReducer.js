import types from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  success: false,
  article: {},
  errors: {}
};

const deleteArticle = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.DELETE_ARTICLE}_RESET`:
    return {
      ...state,
      ...initialState,
    };
  case `${types.DELETE_ARTICLE}_LOADING`:
    return {
      ...state,
      isLoading: true,
      errors: {},
    };
  case `${types.DELETE_ARTICLE}_SUCCESS`: {
    return {
      ...state,
      success: true,
      errors: {},
    };
  }

  case `${types.DELETE_ARTICLE}_FAILURE`: {
    return {
      ...state,
      isLoading: false,
      success: false,
      errors: {
        ...action.payload,
        status: action.payload.statusCode
      }
    };
  }
  default:
    return state;
  }
};

export default deleteArticle;
