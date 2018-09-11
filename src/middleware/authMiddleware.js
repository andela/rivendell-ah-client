import types from '../actions/actionTypes';

const authMiddleware = () => next => (action) => {
  if (action.type === types.SOCIAL_LOGIN) {
    const { token } = action.payload.user;
    localStorage.setItem('token', token);
  }
  return next(action);
};

export default authMiddleware;
