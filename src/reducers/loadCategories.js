import types from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  categories: [],
  errors: {}
};

const loadCategories = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.LOAD_CATEGORIES}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${types.LOAD_CATEGORIES}_SUCCESS`: {
    console.log(action.payload);
    const { categories } = action.payload.data;
    console.log(categories);
    return {
      ...state,
      categories
    };
  }

  case `${types.LOAD_CATEGORIES}_FAILURE`: {
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

export default loadCategories;
