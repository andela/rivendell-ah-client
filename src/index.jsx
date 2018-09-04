import 'babel-polyfill';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import decode from 'jwt-decode';
import store from './store';
import '../public/styles/App.scss';
import App from './App.jsx';
import types from './actions/actionTypes';

if (localStorage.token) {
  const decoded = decode(localStorage.token);
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime < decoded.exp) {
    const token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    store.dispatch({ type: types.PERSIST_LOGIN, payload: { user, token } });
  }
}

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('index')
);
