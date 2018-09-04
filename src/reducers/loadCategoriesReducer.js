import types from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  categories: [],
  errors: {},
  success: false
};

const loadCategoriesReducers = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.LOAD_CATEGORIES}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${types.LOAD_CATEGORIES}_SUCCESS`: {
    const { categories } = action.payload.data;
    return {
      ...state,
      categories,
      success: true
    };
  }

  case `${types.LOAD_CATEGORIES}_FAILURE`: {
    const { response: errors } = action.payload;
    return {
      ...state,
      isLoading: false,
      errors: {
        ...errors,
        status: errors.statusCode,
      },
      editing: false,
      success: false
    };
  }
  default:
    return state;
  }
};

export default loadCategoriesReducers;
