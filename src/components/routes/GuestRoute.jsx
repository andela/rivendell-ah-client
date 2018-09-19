import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const GuestRoute = ({
  redirectUrl, token, component: Component, ...rest
}) => (
  <Route
    {...rest}
    render={
      props => (
        !token ? <Component {...props} />
          : <Redirect to={!redirectUrl ? '/' : redirectUrl} />
      )}
  />
);
export const mapStateToProps = (state) => {
  const { token } = state.auth;
  const { redirectUrl } = state.redirect;
  return {
    token,
    redirectUrl,
  };
};
GuestRoute.propTypes = {
  redirectUrl: PropTypes.string,
  token: PropTypes.string,
  component: PropTypes.func.isRequired
};
GuestRoute.defaultProps = {
  redirectUrl: '',
  token: '',
};

export default connect(mapStateToProps)(GuestRoute);
