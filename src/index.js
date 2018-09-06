import 'babel-polyfill';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import helloWorld from './actions/helloWorld';
import '../public/styles/App.scss';
import types from './actions/actionTypes';

import App from './App';

// testing redux-promise-middleware and redux-saga
setTimeout(() => {
  store.dispatch(helloWorld());
  store.dispatch({ type: `${types.SAGA_WORLD}` });
}, 1000);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('index')
);
