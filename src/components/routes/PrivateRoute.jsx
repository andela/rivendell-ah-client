import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ token, verified, component: Component, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (token && verified) return <Component {...props} />;
      if (!verified) return <Redirect to="/@:username" />;
      localStorage.setItem('redirectRoute', props.location.pathname);
      return <Redirect to="/login" />;
    }}
  />
);

export const mapStateToProps = (state) => {
  const { token } = state.auth;
  const { verified } = state.profile.userProfile;
  return {
    token, verified
  };
};
PrivateRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  component: PropTypes.func.isRequired,
  token: PropTypes.string,
  verified: PropTypes.bool,
};
PrivateRoute.defaultProps = {
  location: PropTypes.shape({
    pathname: ''
  }),
  token: '',
  verified: false,
};

export default connect(mapStateToProps)(PrivateRoute);
