/**
   * @param {Object} errorResonse http error status code
   * @returns {String} error response message
   */
export const resetPasswordResponse = (errorResonse) => {
  const { statusCode, message } = errorResonse;
  switch (statusCode) {
  case 400:
    return 'The password reset token is empty';

  case 401:
    return 'The reset token has expired or is invalid';

  case 404:
    return 'No user was found';

  case 409:
    return 'Password does not match';

  default:
    return message.includes('Network Error')
      ? 'There was a connection problem.'
      : '0ops! Something went wrong. Refresh and try again';
  }
};


/**
   * Renders the component
   * @param {object} errorResonse error message object
   * @returns {string} error message
   */
export const forgotPasswordResponse = (errorResonse) => {
  const { statusCode, message } = errorResonse;
  switch (statusCode) {
  case 400:
    return 'The email you entered is not valid';

  case 404:
    return 'No user was found with provided email';

  default:
    return message.includes('Network Error')
      ? 'There was a connection problem.'
      : '0ops! Something went wrong. Refresh and try again';
  }
};
