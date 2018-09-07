import isPromise from 'is-promise';

const errorMiddleware = () => next => (action) => {
  if (isPromise(action.payload)) {
    return next(action).catch(err => err);
  }
  return next(action);
};

export default errorMiddleware;
