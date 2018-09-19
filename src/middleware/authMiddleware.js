import types from '../actions/actionTypes';

/**
 * authentication middleware that parses responses
 * and stores the token on success
 * @returns {Function} next
 */
const authMiddleware = () => next => (action) => {
  if (action.type === `${types.LOGIN}_SUCCESS`) {
    const { token } = action.payload.data.user;
    action.payload.token = action.payload.data.user.token;
    localStorage.setItem('token', token);
  }
  if (action.type === types.SOCIAL_LOGIN) {
    const { token } = action.payload.user;
    localStorage.setItem('token', token);
  }
  return next(action);
};

export default authMiddleware;
