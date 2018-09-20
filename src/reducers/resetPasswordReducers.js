import types from '../actions/actionTypes';

const { RESET_PASSWORD_LINK, RESET_PASSWORD,
  VALIDATE_RESET_TOKEN } = types;

export const initialState = {
  isLoading: false,
  success: {
    status: false,
    message: '',
  },
  error: {
    status: false,
    statusCode: 0,
    message: '',
  },
};

export const resetPasswordLink = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.RESET_PASSWORD_LINK}_LOADING`:
    return {
      isLoading: true,
      success: { status: false, message: '' },
      error: { status: false, message: '' },
    };

  case `${RESET_PASSWORD_LINK}_SUCCESS`:
    return {
      isLoading: false,
      success: {
        status: true,
        message: action.payload.data.message,
      },
      error: { status: false },
    };

  case `${RESET_PASSWORD_LINK}_FAILURE`:
    return {
      isLoading: false,
      success: { status: false },
      error: {
        status: true,
        statusCode: action.payload.statusCode || 0,
        message: action.payload.message || '',
      }
    };

  default:
    return state;
  }
};


export const prevState = {
  resetToken: '',
  isLoading: false,
  success: {
    status: false,
    message: '',
  },
  error: {
    status: false,
    statusCode: 0,
    message: '',
  },
};


export const resetPassword = (state = prevState, action = {}) => {
  switch (action.type) {
  case `${RESET_PASSWORD}_TOKEN`:
    return {
      ...state,
      resetToken: action.resetToken || '',
    };

  case `${RESET_PASSWORD}_LOADING`:
    return {
      ...state,
      isLoading: true,
      success: { status: false, message: '' },
      error: { status: false, message: '' },
    };

  case `${RESET_PASSWORD}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      success: {
        status: true,
        message: action.payload.message || '',
      },
      error: { status: false },
    };

  case `${RESET_PASSWORD}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      success: { status: false },
      error: {
        status: true,
        statusCode: action.payload.statusCode || 0,
        message: action.payload.message || '',
      }
    };

  default:
    return state;
  }
};

export const initState = {
  isLoading: false,
  isValidToken: false,
};

export const validateResetToken = (state = initState, action = {}) => {
  switch (action.type) {
  case `${VALIDATE_RESET_TOKEN}_LOADING`:
    return {
      isLoading: true,
      isValidToken: false,
    };

  case `${VALIDATE_RESET_TOKEN}_SUCCESS`:
    return {
      isLoading: false,
      isValidToken: true,
    };

  case `${VALIDATE_RESET_TOKEN}_FAILURE`:
    return {
      isLoading: false,
      isValidToken: false,
    };

  default:
    return state;
  }
};
