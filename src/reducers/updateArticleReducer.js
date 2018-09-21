import types from '../actions/actionTypes';

const initialState = {
  editing: true,
  isLoading: false,
  success: false,
  article: {},
  errors: {}
};

const updateArticleReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.UPDATE_ARTICLE}_EDITING`:
    return {
      ...state,
      isLoading: false,
      editing: true,
      errors: {},
    };
  case `${types.UPDATE_ARTICLE}_LOADING`:
    return {
      ...state,
      isLoading: true,
      editing: false,
      errors: {},
    };
  case `${types.UPDATE_ARTICLE}_SUCCESS`: {
    const { data } = action.payload;
    return {
      ...state,
      success: true,
      article: data.article,
      editing: false,
      isLoading: false,
      errors: {}
    };
  }

  case `${types.UPDATE_ARTICLE}_FAILURE`: {
    const { response: errors } = action.payload;
    return {
      ...state,
      isLoading: false,
      errors: {
        ...errors,
        status: errors.statusCode,
      },
      editing: true,
    };
  }
  default:
    return state;
  }
};


export default updateArticleReducer;
