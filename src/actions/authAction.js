import types from './actionTypes';
import axiosInstance from '../services/requestHandler';

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

export default {
  login,
  clearApiValidationError,
  clearAllApiValidationErrors,
};
