import types from './actionTypes';

// redux-promise-middleware action
const helloWorld = () => ({
  type: types.HELLO_WORLD,
  payload: new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello world');
    }, 2000);
  }),
});

export default helloWorld;
