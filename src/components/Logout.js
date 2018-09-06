import React from 'react';

import { withRouter } from 'react-router';
import auths from '../views/auth/AuthRoute';

const { AuthService } = auths;

const Logout = withRouter(({ history }) => (
  AuthService.isAuthenticated ? (
    <p>
      Welcome!
      <button
        type="submit"
        onClick={() => {
          AuthService.logout(() => history.push('/'));
        }}
      >
        Log out

      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
));
export default Logout;
