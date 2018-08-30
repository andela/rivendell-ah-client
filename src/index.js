import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

render((
  <Router>
    <App />
</Router>), document.getElementById('index')
);

// this is a dummy app state for login
// const DummyLoginState = {
//   loggedIn: false,
//   login: function(){
//       this.loggedIn = true;
//   },
//   logout: function(){
//       this.loggedIn = false;
//   }
// };
// export default DummyLoginState;



