import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './views/Main';
import Footer from './components/Footer';

const App = () => (
  <div>
    <Route component={Header} />
    <Main />
    <Footer />
  </div>
);

export default App;
