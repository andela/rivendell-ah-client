import types from '../actions/actionTypes';

const initialState = {
  tags: [],
  articleBody: '',
  title: '',
  category: ''
};


const editArticle = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.CREATE_ARTICLE}_SUCCESS`:
    return;

  case `${types.CREATE_ARTICLE}_FAILURE`:
    return {
      ...state,
      greetings: { data: action.payload },
    };
  default:
    return state;
  }
};

export default editArticle;
