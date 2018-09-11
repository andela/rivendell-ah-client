import types from '../actions/actionTypes';

const initialState = {
  editing: true,
  creatingArticle: false,
  creationComplete: false,
  article: {}

};

const createArticle = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.CREATE_ARTICLE}_PERSISTING_ARTICLE`:
    return {
      ...state,
      editing: false,
      creatingArticle: true,

    };

  case `${types.CREATE_ARTICLE}_EDITING_ARTICLE`:
    return {
      ...state,
      editing: true,
    };
  case `${types.CREATE_ARTICLE}_ARTICLE_CREATED`:
    return {
      ...state,
      creationComplete: true
    };
  case `${types.CREATE_ARTICLE}_FAILURE`: {
    console.log(action, 'this is the action');
    return {
      ...state,
      isLoading: false,
      error: {
        status: true,
        message: action.payload.message,
      }
    };
  }
  default:
    return state;
  }
};

export default createArticle;
