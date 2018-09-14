import types from '../actions/actionTypes';

/**
 * authentication middleware that parses responses
 * and stores the token on success
 * @returns {Function} next
 */
const authMiddleware = () => next => (action) => {
  if (action.type === `${types.LOGIN}_SUCCESS`) {
    let { user } = action.payload.data;
    const { token } = user;
    action.payload.user = user;
    action.payload.token = user.token;
    localStorage.setItem('token', token);
    user = JSON.stringify(user);
    localStorage.setItem('user', user);
  }
  if (action.type === types.SOCIAL_LOGIN) {
    let { user } = action.payload;
    const { token } = user;
    action.payload.user = user;
    action.payload.token = user.token;
    localStorage.setItem('token', token);
    user = JSON.stringify(user);
    localStorage.setItem('user', user);
  }
  if (action.type === types.LOGOUT) {
    localStorage.removeItem('token');
  }
  return next(action);
};

export default authMiddleware;
