import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import validator from 'validator';
import LoginForm from '../forms/LoginForm';
import authAction from '../../actions/authAction';
import redirectAction from '../../actions/redirectAction';
import getUrlParamHelper from '../../helpers/getUrlParamsHelper';

/**
 * Login Component
 * @returns {null} null
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
      socialMediaPlatforms: [
        {
          id: 1,
          link: '/api/auth/google',
          text: 'Sign in with Google',
          divClass: 'social_btn google',
          iconClass: 'google icon',
        },
        {
          id: 2,
          link: '/api/auth/linkedin',
          text: 'Sign in with Linkedin',
          divClass: 'social_btn linkedin',
          iconClass: 'linkedin icon',
        },
        {
          id: 3,
          link: '/api/auth/facebook',
          text: 'Sign in with Facebook',
          divClass: 'social_btn facebook',
          iconClass: 'facebook f icon',
        }
      ],
      visibilityIcon: 'visibility'
    };
    this.updateFormInputErrs = this.updateFormInputErrs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrMsgDismiss = this.handleErrMsgDismiss.bind(this);
    this.visibilityIconClick = this.visibilityIconClick.bind(this);
    this.socialLogin = this.socialLogin.bind(this);
  }

  /**
   * component did mount
   * @returns {null} null
   */
  componentDidMount() {
    this.socialLogin();
    const { clearAllApiValidationErrors, errors } = this.props;
    // clear all validation errors
    if (Object.keys(errors.response).length > 0 || errors.message) {
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
   * render function
   * @returns {Function} jsx
   */
  render() {
    const { errors: apiValidationErrors, isLoading } = this.props;
    const {
      formData, formValidationErrors,
      displayErrMsg, visibilityIcon, socialMediaPlatforms
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
        socialMedia={socialMediaPlatforms}
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

Login.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }),
  history: PropTypes.shape({
    replace: PropTypes.func
  }),
  socialLoginRedirect: PropTypes.func.isRequired,
  socialLogin: PropTypes.func.isRequired,
};

Login.defaultProps = {
  location: {},
  history: {},
};

export const mapStateToProps = (state) => {
  const { isLoading, errors, token } = state.auth;
  const { redirectUrl } = state.redirect;
  return {
    isLoading,
    errors,
    token,
    redirectUrl,
  };
};

export default connect(mapStateToProps, {
  login: authAction.login,
  clearAllApiValidationErrors: authAction.clearAllApiValidationErrors,
  socialLoginRedirect: redirectAction.socialLoginRedirect,
  socialLogin: authAction.socialLogin
})(Login);
