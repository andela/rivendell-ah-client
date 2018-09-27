import types from '../actions/actionTypes';


const initialState = {
  article: {},
  isLoading: false,
  errors: {},
  success: false,
};

const loadArticleReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.LOAD_ARTICLE}_LOADING`:
    return {
      ...state,
      isLoading: true,
      errors: {},
    };

  case `${types.LOAD_ARTICLE}_SUCCESS`: {
    const { data } = action.payload;
    return {
      ...state,
      success: true,
      article: data.article,
      errors: {},
    };
  }
  case `${types.LOAD_ARTICLE}_SAVE`: {
    return {
      ...state,
      success: true,
      article: {
        ...action.payload,
        fromStore: true,
      },
      errors: {},
    };
  }

  case `${types.LOAD_ARTICLE}_FAILURE`: {
    const { response: errors } = action.payload;
    return {
      ...state,
      success: false,
      isLoading: false,
      errors: {
        ...errors,
        status: action.payload.statusCode,
      },
    };
  }


  default: {
    return state;
  }
  }
};


export default loadArticleReducer;
