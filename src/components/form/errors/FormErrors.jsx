import React from 'react';
import { PropTypes } from 'prop-types';
import FormValidationErrors from './FormValidationErrors';
import ApiValidationErrors from './ApiValidationErrors';


/**
 * All form validations in one place
 * @param {Object} props contains both api validaiton
 * and local form validation alongside the error type(form input)
 * @returns {Function} jsx
 */
const FormErrors = (props) => {
  const { formValidationErrors, apiValidationErrors, errorType } = props;
  return (
    <ul>
      <FormValidationErrors
        errors={formValidationErrors}
        errorType={errorType}
      />
      <ApiValidationErrors
        errors={apiValidationErrors}
        field={errorType}
      />
    </ul>
  );
};

FormErrors.propTypes = {
  formValidationErrors: PropTypes.shape({
    errorCount: PropTypes.number
  }).isRequired,
  apiValidationErrors: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  errorType: PropTypes.string.isRequired,
};

export default FormErrors;
