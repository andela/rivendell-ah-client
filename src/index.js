import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import '../public/styles/App.scss';
import types from './actions/actionTypes';

// testing redux-promise-middleware and redux-saga
setTimeout(() => {
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
