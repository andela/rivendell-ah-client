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

<<<<<<< HEAD
const logout = () => ({
  type: types.LOGOUT,
});

=======
>>>>>>> feature(sociallogin): setup social login for frontend (#15)
const socialLogin = user => ({
  type: types.SOCIAL_LOGIN,
  payload: {
    user
  }
});

<<<<<<< HEAD

const { RESET_PASSWORD_LINK, RESET_PASSWORD,
  RESET_PASSWORD_TOKEN, VALIDATE_RESET_TOKEN } = types;

export const resetPassword = (path, password) => (
  {
    type: RESET_PASSWORD,
    payload: axiosInstance().put(
      path,
      { user: { password, confirm: password } },
    ),
  }
);

export const resetPasswordLink = (path, email) => (
  {
    type: RESET_PASSWORD_LINK,
    payload: axiosInstance().post(path, { user: { email } }),
  }
);


export const setToken = resetToken => (
  {
    type: RESET_PASSWORD_TOKEN,
    resetToken,
  }
);

export const validateResetToken = path => ({
  type: VALIDATE_RESET_TOKEN,
  payload: axiosInstance().get(path),
});


=======
>>>>>>> feature(sociallogin): setup social login for frontend (#15)
export default {
  login,
  clearApiValidationError,
  clearAllApiValidationErrors,
  logout,
  socialLogin,
};
