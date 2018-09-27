import types from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  success: false,
  imageUrl: ''
};

const uploadImagerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.UPLOAD_IMAGE}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${types.UPLOAD_IMAGE}_SUCCESS`: {
    const { secure_url } = action.payload; //eslint-disable-line
    return {
      ...state,
      imageUrl: secure_url,
      success: true,
      isLoading: false
    };
  }

  case `${types.UPLOAD_IMAGE}_FAILURE`: {
    return {
      ...state,
      isLoading: false,
      success: false,
    };
  }
  default:
    return state;
  }
};

export default uploadImagerReducer;
