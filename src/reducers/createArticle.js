import types from '../actions/actionTypes';

const initialState = {
  editing: true,
  isLoading: false,
  success: false,
  article: {},
  errors: {}
};

const createArticle = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.CREATE_ARTICLE}_EDITING_ARTICLE`:
    return {
      ...state,
      editing: true,
    };

  case `${types.CREATE_ARTICLE}_LOADING`:
    return {
      ...state,
      isLoading: true,
      editing: false,
    };
  case `${types.CREATE_ARTICLE}_SUCCESS`: {
    const { response } = action.payload;
    console.log(response.data);
    return {
      ...state,
      success: true,
      article: response.data,
      editing: false,
    };
  }

  case `${types.CREATE_ARTICLE}_FAILURE`: {
    console.log(action, 'this is the action');
    const { response } = action.payload;
    const { message } = response.data.errors;
    return {
      ...state,
      isLoading: false,
      error: {
        status: response.status,
        message
      },
      editing: true,
    };
  }
  default:
    return state;
  }
};

export default createArticle;
