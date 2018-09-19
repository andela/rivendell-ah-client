import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const VerifiedRoute = ({
  token, verified, username, component: Component, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (token && verified) return <Component {...props} />;
      if (token && !verified) return <Redirect to={`/@${username}`} />;
      localStorage.setItem('redirectRoute', props.location.pathname);
      return <Redirect to="/login" />;
    }}
  />
);

export const mapStateToProps = (state) => {
  const { token } = state.auth;
  const { verified, username } = state.profile.userProfile;
  return {
    token, verified, username
  };
};
VerifiedRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  component: PropTypes.func.isRequired,
  token: PropTypes.string,
  verified: PropTypes.bool,
  username: PropTypes.string,
};
VerifiedRoute.defaultProps = {
  location: PropTypes.shape({
    pathname: ''
  }),
  token: '',
  verified: false,
  username: '',
};

export default connect(mapStateToProps)(VerifiedRoute);
