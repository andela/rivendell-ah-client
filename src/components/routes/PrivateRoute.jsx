import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ token, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (token) return <Component {...props} />;
      localStorage.setItem('redirectRoute', props.location.pathname);
      return <Redirect to="/login" />;
    }}
  />
);

const mapStateToProps = (state) => {
  const { token } = state.auth;
  return {
    token,
  };
};
PrivateRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  component: PropTypes.func.isRequired,
  token: PropTypes.string
};
PrivateRoute.defaultProps = {
  location: PropTypes.shape({
    pathname: ''
  }),
  token: ''
};

export default connect(mapStateToProps)(PrivateRoute);
