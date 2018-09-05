import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * local form validaton component
 * @param {Object} param0 contains form errors and error type
 * (form input)
 * @returns {Function} jsx
 */
const FormValidationErrors = ({ errors, errorType }) => (
  errors[errorType]
    .map((error, index) => <li key={index}>{error}</li>)
);

FormValidationErrors.propTypes = {
  errors: PropTypes.shape({
    errorCount: PropTypes.number
  }).isRequired,
  errorType: PropTypes.string.isRequired,
};

export default FormValidationErrors;
