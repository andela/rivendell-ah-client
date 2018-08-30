import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import '../public/styles/App.scss';

render((
  <Router>
    <App />
</Router>), document.getElementById('index')
);
