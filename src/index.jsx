import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import decode from 'jwt-decode';
import App from './App';
import store from './store';
import '../public/styles/App.scss';
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
      <Route component={App} />
    </Router>
  </Provider>,
  document.getElementById('index')
);
