import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AuthService = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  logout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      AuthService.isAuthenticated === true
        ? <Component {...props} />
        : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}
          />
        )
    )}
  />
);
AuthRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  component: PropTypes.func.isRequired
};
AuthRoute.defaultProps = {
  location: {},
};

export default { AuthRoute, AuthService };
