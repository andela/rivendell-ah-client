import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { setToken, resetPassword, validateResetToken }
  from '../../../actions/authAction';
import ResetPasswordForm from './ResetPasswordForm';
import InvalidTokenMessage from './InvalidTokenMessage';
import { resetPasswordResponse as serverErrorResponse }
  from '../../../helpers/responseHelpers';

// const { setToken, resetPassword } = resetPasswordActions;

/**
 *
 * The ResetPassword component renders view to get
 * user email and hits the route that sends reset
 * password link to user email
 * @class ResetPassword
 * @returns {undefined} this is a class thus does not return anything
 */
export class ResetPassword extends React.Component {
  /**
 * @returns {null} null
export default Header;
*/
  constructor() {
    super();
    this.state = {
      password: '',
      confirm: '',
      disabled: true,
      frontendValidations: {
        password: [],
        confirm: [],
      },
    };

    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordVisibility = this.handlePasswordVisibility.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  validity = {
    passwordIsValid: false,
    passwordIsConfirmed: false,
    isRepeated: false,
  };

  frontendValidations = {
    password: [],
    confirm: [],
  };

  /**
   * componentDidMoutn
   * @returns {null} null
   */
  componentDidMount() {
    const { location, dispatch } = this.props;
    const token = location.search.substr(7);

    if (!localStorage.getItem('resetToken')) {
      localStorage.setItem('resetToken', token);
    }
    const path = `/users/reset-password?token=${token}`;
    dispatch(validateResetToken(path));
  }

  /**
   * componentDidUpdate
   * @returns {null} null
   */
  componentDidUpdate() {
    const { history, location, dispatch, isValidToken } = this.props;
    const { isRepeated } = this.validity;
    if (isValidToken && !isRepeated) {
      this.validity.isRepeated = true;
      dispatch(setToken(localStorage.getItem('resetToken')));
      localStorage.removeItem('resetToken');
      history.replace(location.pathname);
    }
  }

  /**
   * Handles validation of the confirm password input
   * @param {Object} input the target input
   * @returns {undefined} no value is returned
   */
  validateConfirmPassword(input) {
    const { password } = this.state;
    if (input.name !== 'confirm') return;
    if (!input.value) {
      this.validity.passwordIsConfirmed = false;
      return;
    }
    if (input.value !== password) {
      this.validity.passwordIsConfirmed = false;
      return;
    }
    this.validity.passwordIsConfirmed = true;
  }

  /**
   * Handles validation of the password input
   * @param {Object} input the target input
   * @returns {undefined} no value
   */
  validatePassword(input) {
    if (input.name !== 'password') return;
    if (!input.value) {
      this.validity.passwordIsValid = false;
      return;
    }
    const passwordPattern = new RegExp(['^(?=.*[\\d])(?=.*[A-Z])(?=.*[a-z])',
      '(?=.*[!@#$%^&*])[\\w!@#$%^&*]{8,}$'].join(''));
    const { confirm } = this.state;
    if (!passwordPattern.test(input.value)) {
      this.validity.passwordIsValid = false;
      this.validity.passwordIsConfirmed = confirm === input.value;
      return;
    }
    this.validity.passwordIsValid = true;
    this.validity.passwordIsConfirmed = confirm === input.value;
  }

  /**
   * handle form submission
   * @param {Object} event event object
   * @returns {null} null
   */
  handleSubmit(event) {
    event.preventDefault();
    const {
      passwordIsValid,
      passwordIsConfirmed
    } = this.validity;

    if (!passwordIsValid || !passwordIsConfirmed) return;
    const { password } = this.state;

    const { resetToken, dispatch } = this.props;
    localStorage.setItem('token', resetToken);
    this.setState({ password: '', confirm: '' });
    dispatch(resetPassword('/users/reset-password', password));
    localStorage.removeItem('token');
  }

  /**
   * handle change on form fields
   * @param {Object} event event object
   * @returns {null} null
   */
  handleInput(event) {
    const input = event.target;

    this.validatePassword(input);
    this.validateConfirmPassword(input);

    const {
      passwordIsValid,
      passwordIsConfirmed,
    } = this.validity;
    let disable = true;

    const isEmptyPasswordInput = input.name === 'password'
      && !input.value;
    const isEmptyConfirmInput = input.name === 'confirm'
      && !input.value;

    if (passwordIsValid || isEmptyPasswordInput) {
      this.frontendValidations.password.length = 0;
    }

    if (passwordIsConfirmed || isEmptyConfirmInput) {
      this.frontendValidations.confirm.length = 0;
    }

    if (passwordIsValid && passwordIsConfirmed) disable = false;

    this.setState({
      [event.target.name]: event.target.value,
      disabled: disable,
      frontendValidations: this.frontendValidations,
    });
  }

  /**
   * handle password visibility
   * @param {Object} event event object
   * @returns {undefined} undefined
   */
  handlePasswordVisibility = (event) => {
    const { target } = event;
    if (target.tagName !== 'I') return;
    const input = target.closest('span').previousSibling;
    if (target.className === 'fa fa-eye') {
      input.type = 'text';
      target.className = 'fa fa-eye-slash';
    } else {
      input.type = 'password';
      target.className = 'fa fa-eye';
    }
  }

  /**
   * handles inputs onMouseLeave event
   * @returns {undefined} undefined
   */
  handleMouseLeave() {
    const {
      passwordIsValid,
      passwordIsConfirmed
    } = this.validity;

    const { password, confirm } = this.state;

    if (!passwordIsValid && password) {
      this.frontendValidations.password
        .push('Password must contain a special character, '
          + 'uppercase, lowercase, number and atleast 8 characters');
    }

    if (!passwordIsConfirmed && confirm) {
      this.frontendValidations.confirm.push('Password does not match');
    }

    this.setState({ frontendValidations: this.frontendValidations });
  }

  /**
   * Renders the component
   * @returns {string} - HTML Markup for the component
   */
  render() {
    const { isLoading, success, backendError, isValidToken } = this.props;
    const { frontendValidations, disabled,
      password, confirm } = this.state;

    const passwordErrorMessage = frontendValidations.password[0]
      ? frontendValidations.password
        .map((error, index) => <li key={index}>{error}</li>) : [''];
    const confirmErrorMessage = frontendValidations.confirm[0]
      ? frontendValidations.confirm
        .map((error, index) => <li key={index}>{error}</li>) : [''];

    const serverResponse = { message: '', style: '' };

    if (backendError.status) {
      serverResponse.message = serverErrorResponse(backendError);
      serverResponse.style = 'errorMessage';
    }
    if (success.status) {
      serverResponse.message = 'Your password has been successfully updated';
      serverResponse.style = 'successMessage';
    }

    return (
      <div id="reset-password">
        {
          isValidToken ? (
            <div>
              <ResetPasswordForm
                handleSubmit={this.handleSubmit}
                handleInput={this.handleInput}
                isLoading={isLoading}
                serverResponse={serverResponse}
                success={success.status}
                handleMouseLeave={this.handleMouseLeave}
                disabled={disabled}
                password={password}
                confirm={confirm}
                handlePasswordVisibility={this.handlePasswordVisibility}
                frontendValidations={
                  { passwordErrorMessage, confirmErrorMessage }
                }
              />
            </div>
          )
            : (<div><InvalidTokenMessage /></div>)
        }
      </div>
    );
  }
}

export const mapStateToProps = ({
  resetPassword: { resetToken, isLoading, success, error },
  validateResetToken: { isValidToken }
}) => ({
  resetToken,
  isLoading,
  success,
  backendError: error,
  isValidToken,
});


ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isValidToken: PropTypes.bool.isRequired,
  resetToken: PropTypes.string.isRequired,
  success: PropTypes.shape({
    status: PropTypes.bool.isRequired,
  }).isRequired,
  backendError: PropTypes.shape({
    status: PropTypes.bool.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(ResetPassword);
