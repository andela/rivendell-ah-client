import React from 'react';
import axiosInstance from './services/requestHandler';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './views/Main';

/**
 * example function of how to make http request
 * using the axios instance
 * @returns { Object } response from server
 */
/* eslint-disable class-methods-use-this */
const makeRequest = () => {
  /* eslint-disable no-console */
  axiosInstance().get('/articles')
    .then(res => console.log(res.data));
};

const App = () => (
  <div>
    <Header />
    <Main />
    <button onClick={makeRequest}>Get articles</button>
    <Footer />
  </div>
);

export default App;
