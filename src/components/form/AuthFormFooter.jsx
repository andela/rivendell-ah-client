import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

/**
 * The footer component for auth pages
 * @param {Object} param0 contains authType(login or signup)
 * @returns {Function} jsx
 */
const AuthFormFooter = ({ authType }) => {
  let message;
  let button;
  if (authType === 'login') {
    message = 'Dont\' have an account?';
    button = <Link to="/signup">Register now!</Link>;
  }
  if (authType === 'signup') {
    message = 'Already have an account?';
    button = <Link to="/login">Login</Link>;
  }
  return (
    <div className="form-footer">
      <p>
        {message}
        &nbsp;
        {button}
      </p>
    </div>
  );
};

AuthFormFooter.propTypes = {
  authType: PropTypes.string.isRequired,
};


export default AuthFormFooter;
