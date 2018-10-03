import types from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  success: false,
  report: {},
  errors: {}
};

const reportArticle = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.REPORT_ARTICLE}_RESET`:
    return {
      ...state,
      ...initialState,
    };
  case `${types.REPORT_ARTICLE}_LOADING`:
    return {
      ...state,
      isLoading: true,
      errors: {},
    };
  case `${types.REPORT_ARTICLE}_SUCCESS`: {
    const { data } = action.payload;
    return {
      ...state,
      success: true,
      report: data.report,
      isLoading: false,
      errors: {},
    };
  }

  case `${types.REPORT_ARTICLE}_FAILURE`: {
    const { response: errors } = action.payload;
    return {
      ...state,
      isLoading: false,
      success: false,
      errors: {
        ...errors,
        message: [action.payload.message],
        status: errors.statusCode,
      },
    };
  }
  default:
    return state;
  }
};

export default reportArticle;
