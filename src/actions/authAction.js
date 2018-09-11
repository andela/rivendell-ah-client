import axiosInstance from '../services/requestHandler';
import types from './actionTypes';

const login = formData => ({
  type: types.LOGIN,
  payload: axiosInstance()
    .post('/users/login', { user: formData }),
});

const clearApiValidationError = fieldName => ({
  type: types.CLEAR_API_VALIDATION_ERR,
  payload: fieldName,
});

const clearAllApiValidationErrors = () => ({
  type: types.CLEAR_ALL_API_VALIDATION_ERRS,
});

const socialLogin = user => ({
  type: types.SOCIAL_LOGIN,
  payload: {
    user
  }
});

export default {
  login,
  clearApiValidationError,
  clearAllApiValidationErrors,
  socialLogin,
};
