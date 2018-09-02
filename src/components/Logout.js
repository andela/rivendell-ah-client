import React from 'react';
import auths from '../views/auth/AuthRoute';
import { withRouter } from 'react-router';

const {AuthService} = auths;

const Logout = withRouter(({ history }) => (
  AuthService.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        AuthService.logout(() => history.push('/'))
      }}>Log out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
));
export default Logout;
