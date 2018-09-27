
import types from '../actions/actionTypes';

/**
 * authentication middleware that parses responses
 * and stores the token on success
 * @returns {Function} next
 */
const authMiddleware = () => next => (action) => {
  if (!action) return;
  if (action.type === `${types.LOGIN}_SUCCESS`
    || action.type === `${types.SIGN_UP}_SUCCESS`
    || action.type === types.SOCIAL_LOGIN) {
    let payloadData;
    if (action.type === types.SOCIAL_LOGIN) {
      payloadData = action.payload;
    } else {
      payloadData = action.payload.data;
    }
    let { user } = payloadData;
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
    const { user } = action.payload;
    const { token } = action.payload.user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  return next(action);
};

export default authMiddleware;
