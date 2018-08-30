import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const GuestRoute = ({
 isAuthenticated,
 component: Component,
 ...restOfProps
}) => (
 <Route
   {...restOfProps}
   render={props =>
     !isAuthenticated ? <Component {...props} /> : <Redirect to="/admin/dashboard" />
   }
 />
);

GuestRoute.propTypes = {
 component: PropTypes.func.isRequired,
 isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps({ user }) {
 return {
   isAuthenticated: !!user.token
 };
}

export default connect(mapStateToProps)(GuestRoute);