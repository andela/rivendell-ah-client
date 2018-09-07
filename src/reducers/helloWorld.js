import types from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  error: {
    status: false,
    message: '',
  },
  greetings: {
    data: '',
  },
};

const helloWorld = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.SAGA_WORLD}_SUCCESS`:
    return {
      ...state,
      greetings: { data: action.payload },
    };
  case `${types.HELLO_WORLD}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${types.HELLO_WORLD}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      greetings: { data: action.payload },
    };
  case `${types.HELLO_WORLD}_FAILURE`: {
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

export default helloWorld;
