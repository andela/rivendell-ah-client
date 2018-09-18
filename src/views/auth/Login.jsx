import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import validator from 'validator';
import LoginForm from '../forms/LoginForm';
import authAction from '../../actions/authAction';

/**
 * Login Component
 */
export class Login extends React.Component {
  /**
   * constructor function
   */
  constructor() {
    super();
    this.state = {
      displayErrMsg: true,
      formData: {
        email: '',
        password: '',
      },
      formValidationErrors: {
        errorCount: 0,
        email: [],
        password: [],
      },
      visibilityIcon: 'visibility'
    };
    this.updateFormInputErrs = this.updateFormInputErrs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrMsgDismiss = this.handleErrMsgDismiss.bind(this);
    this.visibilityIconClick = this.visibilityIconClick.bind(this);
  }

  /**
   * component did mount
   * @returns {null} null
   */
  componentDidMount() {
    const { clearAllApiValidationErrors, errors } = this.props;
    // clear all validation errors
    if (Object.keys(errors.response).length > 0 || errors.message) {
      clearAllApiValidationErrors();
    }
  }

  /**
   * Validate form inputs
   * @param {String} email email from login form
   * @param {String} password password from login form
   * @returns {Object} error object
   */
  validate = ({ email, password }) => {
    const errors = {
      errorCount: 0,
      password: [],
      email: []
    };
    if (!password) {
      errors.password.push('Password is required');
      errors.errorCount += 1;
    }
    if (!email) {
      errors.email.push('Email is required');
      errors.errorCount += 1;
    }
    if (!validator.isEmail(email)) {
      errors.email.push('Please enter a valid email');
      errors.errorCount += 1;
    }
    return errors;
  }


  /**
   * updates form input errors on input field value change
   * @param {Array} formInputErrors errors on an input field
   * @param {String} formInput name of input field
   * @returns {null} null
   */
  updateFormInputErrs(formInputErrors, formInput) {
    let index = formInputErrors
      .indexOf(`${formInput.placeholder} is required`);
    // remove the 'is required' error, on input field change
    if (index > -1) formInputErrors.splice(index, 1);
    if (formInput.name === 'email'
      && validator.isEmail(formInput.value)) {
      index = formInputErrors
        .indexOf(`Please enter a valid ${formInput.name}`);
      // remove the 'valid email' error when the email becomes valid
      if (index > -1) formInputErrors.splice(index, 1);
    }
    this.setState(state => (
      {
        ...state,
        formData: {
          // update form input state on change
          ...state.formData, [formInput.name]: formInput.value
        },
        formValidationErrors: {
          ...state.formValidationErrors,
          [formInput.name]: formInputErrors
        },
      }
    ));
  }

  /**
   * handle change on form fields
   * @param {Object} event event object
   * @returns {null} null
   */
  handleChange(event) {
    const { formValidationErrors } = this.state;
    const formInputErrors = [...formValidationErrors[event.target.name]];
    // update form input errors on input field value change
    this.updateFormInputErrs(formInputErrors, event.target);
  }

  /**
   * handle form submit
   * @param {Object} event event object
   * @returns {null} null
   */
  handleSubmit(event) {
    event.preventDefault();
    const { login } = this.props;
    const { formData } = this.state;
    const formValidationErrors = this.validate(formData);
    this.setState({ formValidationErrors });
    // do not submit the form if there are validation errors
    if (formValidationErrors.errorCount === 0) {
      this.setState({ displayErrMsg: true });
      login(formData);
    }
  }

  /**
   * handle error message dismiss
   * @returns {null} null
   */
  handleErrMsgDismiss() {
    this.setState({ displayErrMsg: false });
  }

  /**
   * handle visibility icon click
   * @returns {null} null
   */
  visibilityIconClick() {
    const { visibilityIcon } = this.state;
    if (visibilityIcon === 'visibility') {
      this.setState({ visibilityIcon: 'visibility_off' });
    } else {
      this.setState({ visibilityIcon: 'visibility' });
    }
  }

  /**
   * render function
   * @returns {Function} jsx
   */
  render() {
    const { errors: apiValidationErrors, isLoading } = this.props;
    const {
      formData, formValidationErrors,
      displayErrMsg, visibilityIcon,
    } = this.state;
    return (
      <LoginForm
        isLoading={isLoading}
        apiValidationErrors={apiValidationErrors}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleErrMsgDismiss={this.handleErrMsgDismiss}
        formData={formData}
        formValidationErrors={formValidationErrors}
        displayErrMsg={displayErrMsg}
        visibilityIcon={visibilityIcon}
        visibilityIconClick={this.visibilityIconClick}
      />
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  clearAllApiValidationErrors: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired
};

export const mapStateToProps = (state) => {
  const { isLoading, errors } = state.auth;
  return {
    isLoading, errors,
  };
};

export default connect(mapStateToProps, {
  login: authAction.login,
  clearAllApiValidationErrors: authAction.clearAllApiValidationErrors
})(Login);
