import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * display validation errors from the api
 * @param {Object} param0 contains api validation errors
 * and the concerned form field
 * @returns {Function} jsx
 */
const ApiValidationErrors = ({ errors, field }) => {
  if (!errors.response[field]) return null;
  return (
    Array.isArray(errors.response[field]) ? (
      errors.response[field]
        .map((error, index) => (
          <li key={index}>{error}</li>
        ))
    ) : (
      <li>
        {`${field} ${errors.response[field]}`}
      </li>
    )
  );
};

ApiValidationErrors.propTypes = {
  errors: PropTypes.shape({
    message: PropTypes.string
  }).isRequired,
  field: PropTypes.string.isRequired,
};

export default ApiValidationErrors;
