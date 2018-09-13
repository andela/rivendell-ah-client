import React, { Component } from 'react';
import validator from 'validator';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import SignupForm from '../forms/SignupForm';
import authAction from '../../actions/authAction';
import redirectAction from '../../actions/redirectAction';
import getUrlParamHelper from '../../helpers/getUrlParamsHelper';

/**
 * Signup form
 * @returns {Function} jsx
 * @param {Object} formData
 */
export class Signup extends Component {
  /**
   * constructor function
   * @param {Object} props props object
   */
  constructor(props) {
    super(props);
    this.state = {
      displayErrMsg: true,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirm: ''
      },
      validationErrors: {
        errorCount: 0,
        firstName: [],
        lastName: [],
        username: [],
        password: [],
        confirm: [],
        email: []
      },
      socialMediaPlatforms: [
        {
          id: 1,
          link: '/api/auth/google',
          text: 'Sign up with Google',
          divClass: 'social_btn google',
          iconClass: 'google icon',
        },
        {
          id: 2,
          link: '/api/auth/linkedin',
          text: 'Sign up with Linkedin',
          divClass: 'social_btn linkedin',
          iconClass: 'linkedin icon',
        },
        {
          id: 3,
          link: '/api/auth/facebook',
          text: 'Sign up with Facebook',
          divClass: 'social_btn facebook',
          iconClass: 'facebook f icon',
        }
      ],
      passwordVisibilityIcon: 'visibility',
      confirmVisibilityIcon: 'visibility',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.visibilityIconClick = this.visibilityIconClick.bind(this);
    this.socialLogin = this.socialLogin.bind(this);
  }

  /**
   * component did mount
   * @returns {null} null
   */
  componentDidMount() {
    this.socialLogin();
    const { clearAllApiValidationErrors, signUpErrors } = this.props;
    // clear all validation errors
    if (Object.keys(signUpErrors.response).length > 0 || signUpErrors.message) {
      clearAllApiValidationErrors();
    }
  }

  /**
  * ComponentWillMount lifecycle
  * @returns {string} - HTML Markup for the component
  */
  componentWillUnmount() {
    localStorage.removeItem('redirectRoute');
    localStorage.removeItem('urlParams');
  }

  /**
   * updates form input errors on input field value change
   * @param {Array} formInputErrors errors on an input field
   * @param {String} formInput name of input field
   * @returns {null} null
   */
  updateFormInputErrs = (formInputErrors, formInput) => {
    const { formData: { password } } = this.state;
    let index = formInputErrors.indexOf(`${formInput.placeholder} is required`);
    // remove the 'is required' error, on input field change
    if (index > -1) formInputErrors.splice(index, 1);
    if (formInput.name === 'firstName' && formInput.value.length >= 2) {
      index = formInputErrors.indexOf(
        'First name entered should have minimum of 2 characters'
      );
      if (index > -1) formInputErrors.splice(index, 1);
    }
    // remove the 'is required' error, on input field change
    if (formInput.name === 'lastName' && formInput.value.length >= 2) {
      index = formInputErrors.indexOf(
        'Last name entered should have minimum of 2 characters'
      );
      if (index > -1) formInputErrors.splice(index, 1);
    }
    if (formInput.name === 'email' && validator.isEmail(formInput.value)) {
      index = formInputErrors.indexOf(`please enter a valid ${formInput.name}`);
      // remove the 'valid email' error when the email becomes valid
      if (index > -1) formInputErrors.splice(index, 1);
    }
    // remove the 'is required' error, on input field change
    const reg = (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
    if (formInput.name === 'password'
      && (reg.test(formInput.value))) {
      index = formInputErrors.indexOf(
        'Your password must include an uppercase, '
      + 'lowercase, a number, a special character and'
      + 'a minimum length of 8 characters'
      );
      if (index > -1) formInputErrors.splice(index, 1);
    }

    if (formInput.name === 'confirm' && formInput.value === password) {
      index = formInputErrors.indexOf(
        'Confirm password does not match'
      );
      if (index > -1) formInputErrors.splice(index, 1);
    }

    this.setState(state => ({
      ...state,
      formData: {
        // update form input state on change
        ...state.formData,
        [formInput.name]: formInput.value
      },
      validationErrors: {
        ...state.validationErrors,
        [formInput.name]: formInputErrors
      }
    }));
  };

  /**
   * Validate form inputs
   * @param {String} email email from login form
   * @param {String} password password from login form
   * @returns {Object} error object
   */
  validate = ({ firstName, lastName, email, username, password, confirm }) => {
    const errors = {
      errorCount: 0,
      firstName: [],
      lastName: [],
      username: [],
      password: [],
      email: [],
      confirm: []
    };
    if (!firstName) {
      errors.firstName.push('First name is required');
      errors.errorCount += 1;
    }
    if (firstName.length < 2) {
      errors.firstName.push(
        'First name entered should have minimum of 2 characters'
      );
      errors.errorCount += 1;
    }
    if (!lastName) {
      errors.lastName.push('Last name is required');
      errors.errorCount += 1;
    }
    if (lastName.length < 2) {
      errors.lastName.push(
        'Last name entered should have minimum of 2 characters'
      );
      errors.errorCount += 1;
    }
    if (!username) {
      errors.username.push('Username is required');
      errors.errorCount += 1;
    }
    if (!password) {
      errors.password.push('Password is required');
      errors.errorCount += 1;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        .test(password)
    ) {
      errors.password.push('Your password must include an uppercase, '
      + 'lowercase, a number, a special character and'
      + 'a minimum length of 8 characters');
      errors.errorCount += 1;
    }
    if (!confirm) {
      errors.confirm.push('Confirm password is required');
      errors.errorCount += 1;
    }
    if (confirm !== password) {
      errors.confirm.push('Confirm password does not match');
      errors.errorCount += 1;
    }
    if (!email) {
      errors.email.push('Email is required');
      errors.errorCount += 1;
    }
    if (!validator.isEmail(email)) {
      errors.email.push('please enter a valid email');
      errors.errorCount += 1;
    }
    return errors;
  };

  /**
   * handle error message dismiss
   * @returns {null} null
   */
  handleErrMsgDismiss = () => {
    this.setState({ displayErrMsg: false });
  };

  /**
   * handle form submit
   * @param {Object} event event object
   * @returns {null} null
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const { signupAction } = this.props;
    const { formData } = this.state;
    const validateErrors = this.validate(formData);
    this.setState({ validationErrors: validateErrors });
    if (validateErrors.errorCount === 0) {
      this.setState({ displayErrMsg: true });
      signupAction(formData);
    }
  };

  /**
   * handles social login
   * @returns {null} null
   */
  socialLogin() {
    const { location, history } = this.props;
    const urlParams = location.search.substring(1);
    if (urlParams) {
      localStorage.setItem('urlParams', urlParams);
      history.replace('/login');
    }

    const retrievedParams = localStorage.getItem('urlParams');
    if (retrievedParams) {
      const user = {
        email: '',
        image: '',
        firstName: '',
        lastName: '',
        bio: '',
        token: '',
        username: '',
      };

      Object.keys(user).forEach((element) => {
        user[element] = getUrlParamHelper(element, location);
      });

      // dispatch to token and decoded token to store
      const { socialLogin } = this.props;
      socialLogin(user);

      // redirect to default home route or previous route
      const redirectRoute = localStorage.getItem('redirectRoute');
      if (redirectRoute) {
        const { socialLoginRedirect } = this.props;
        socialLoginRedirect(redirectRoute);
      }
    }
  }

  /**
   * handle change on form fields
   * @param {Object} event event object
   * @returns {null} null
   */
  handleChange(event) {
    const { signUpErrors, clearApiValidationError } = this.props;
    // remove error from api on form input when change occurs
    if (signUpErrors.response[event.target.name]) {
      clearApiValidationError(event.target.name);
    }
    const { validationErrors } = this.state;
    const formInputErrors = [...validationErrors[event.target.name]];
    // update form input errors on input field value change
    this.updateFormInputErrs(formInputErrors, event.target);
  }

  /**
   * handle visibility icon click
   * @param {Object} event event
   * @returns {null} null
   */
  visibilityIconClick(event) {
    if (event.target.tagName !== 'I') return;
    const input = event.currentTarget.childNodes[1];
    if (input.name === 'confirm') {
      const { confirmVisibilityIcon } = this.state;
      if (confirmVisibilityIcon === 'visibility') {
        this.setState({ confirmVisibilityIcon: 'visibility_off' });
      } else {
        this.setState({ confirmVisibilityIcon: 'visibility' });
      }
    }
    if (input.name === 'password') {
      const { passwordVisibilityIcon } = this.state;
      if (passwordVisibilityIcon === 'visibility') {
        this.setState({ passwordVisibilityIcon: 'visibility_off' });
      } else {
        this.setState({ passwordVisibilityIcon: 'visibility' });
      }
    }
  }

  /**
   * @returns {Function} jsx
   */
  render() {
    const {
      isLoading,
      signUpErrors,
      clearApiValidationError,
      clearAllApiValidationErrors
    } = this.props;
    const {
      displayErrMsg,
      formData,
      validationErrors,
      passwordVisibilityIcon,
      confirmVisibilityIcon,
      socialMediaPlatforms,
    } = this.state;
    return (
      <div>
        <SignupForm
          handleSigupSubmit={this.handleSignupSubmit}
          isLoading={isLoading}
          signUpErrors={signUpErrors}
          clearAllApiValidationErrors={clearAllApiValidationErrors}
          clearApiValidationError={clearApiValidationError}
          displayErrMsg={displayErrMsg}
          formData={formData}
          validationErrors={validationErrors}
          handleSubmit={this.handleSubmit}
          handleErrMsgDismiss={this.handleErrMsgDismiss}
          handleChange={this.handleChange}
          passwordVisibilityIcon={passwordVisibilityIcon}
          confirmVisibilityIcon={confirmVisibilityIcon}
          visibilityIconClick={this.visibilityIconClick}
          socialMedia={socialMediaPlatforms}
        />
      </div>
    );
  }
}

Signup.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  signupAction: PropTypes.func.isRequired,
  clearApiValidationError: PropTypes.func.isRequired,
  clearAllApiValidationErrors: PropTypes.func.isRequired,
  signUpErrors: PropTypes.shape({
    message: PropTypes.string.isRequired,
    response: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }),
  history: PropTypes.shape({
    replace: PropTypes.func
  }),
  socialLoginRedirect: PropTypes.func.isRequired,
  socialLogin: PropTypes.func.isRequired,
};

Signup.defaultProps = {
  location: {},
  history: {},
};

export const mapStateToProps = state => ({
  signUpErrors: state.auth.errors,
  isLoading: state.auth.isLoading
});

export default connect(
  mapStateToProps,
  {
    signupAction: authAction.signup,
    clearApiValidationError: authAction.clearApiValidationError,
    clearAllApiValidationErrors: authAction.clearAllApiValidationErrors,
    socialLoginRedirect: redirectAction.socialLoginRedirect,
    socialLogin: authAction.socialLogin
  }
)(Signup);
