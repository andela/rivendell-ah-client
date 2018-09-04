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
      isLoading: true
    };

  case `${types.LOAD_ARTICLE}_SUCCESS`: {
    const { data } = action.payload;
    return {
      ...state,
      success: true,
      article: data.article
    };
  }

  case `${types.LOAD_ARTICLE}_FAILURE`: {
    const { response } = action.payload;
    return {
      ...state,
      success: false,
      errors: {
        ...response.data.errors,
        status: response.status,

      }
    };
  }


  default: {
    return state;
  }
  }
};


export default loadArticleReducer;
