import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const GuestRoute = ({ token, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      !token ? <Component {...props} /> : <Redirect to="/" />
    )}
  />
);

GuestRoute.propTypes = {
  token: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};

export const mapStateToProps = (state) => {
  const { token } = state.auth;
  return {
    token,
  };
};

export default connect(mapStateToProps)(GuestRoute);
