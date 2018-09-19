
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProfileRoute = ({ token, verified, component: Component, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (token) return <Component {...props} />;
      localStorage.setItem('redirectRoute', props.location.pathname);
      return <Redirect to="/login" />;
    }}
  />
);

export const mapStateToProps = (state) => {
  const { token } = state.auth;
  return {
    token,
  };
};
ProfileRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  component: PropTypes.func.isRequired,
  token: PropTypes.string,
  verified: PropTypes.bool,
};
ProfileRoute.defaultProps = {
  location: PropTypes.shape({
    pathname: ''
  }),
  token: '',
  verified: false,
};

export default connect(mapStateToProps)(ProfileRoute);
