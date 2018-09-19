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
    const {
      bio, email, firstName, id, image, lastName, username, verified
    } = user;
    user = JSON.stringify({
      bio, email, firstName, id, image, lastName, username, verified
    });
    localStorage.setItem('user', user);
  }
  if (action.type === types.LOGOUT) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  if (action.type === types.SOCIAL_LOGIN) {
    const { token } = action.payload.user;
    localStorage.setItem('token', token);
  }
  if (action.type === types.SOCIAL_LOGIN) {
    const { token } = action.payload.user;
    localStorage.setItem('token', token);
  }
  if (action.type === types.SOCIAL_LOGIN) {
    const { token } = action.payload.user;
    localStorage.setItem('token', token);
  }
  return next(action);
};

export default authMiddleware;
