import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ForgotPasswordForm from './ForgotPasswordForm';
import { resetPasswordLink } from '../../../actions/authAction';
import { forgotPasswordResponse as serverErrorResponse }
  from '../../../helpers/responseHelpers';

/**
 * The ForgotPassword component renders view to get
 * user email and hits the route that sends reset
 * password link to user email
 * @class ForgotPassword
 * @returns {undefined} this is a class thus does not return anything
 */
export class ForgotPassword extends React.Component {
/**
 * @returns {null} null
export default Header;
*/
  constructor() {
    super();
    this.state = {
      email: '',
      emailErrors: [],
    };

    this.validate = this.validate.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Renders the component
   * @param {object} email event object
   * @returns {undefined} returns nothing
   */
  validate(email) {
    const emailErrors = [];
    if (!email) emailErrors.push('Email cannot be empty');

    const emailPattern = new RegExp(['^(([^<>()[\\]\\.,;:\\s@"]+(\\.',
      '[^<>()\\[\\]\\.,;:\\s@"]+)*)',
      '|(".+"))@((\\[[0-9]{1,3}\\.',
      '[0-9]{1,3}\\.[0-9]{1,3}\\.',
      '[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+',
      '[a-zA-Z]{2,}))$'].join(''));

    if (!emailPattern.test(email)) {
      const errorMessage = 'The email you have entered is not valid.';
      emailErrors.push(errorMessage);
    }
    if (emailErrors[0]) {
      this.setState({ emailErrors });
      return false;
    }
    return true;
  }

  /**
   * Renders the component
   * @param {object} event event object
   * @returns {void} returns nothing
   */
  handleInput(event) {
    this.setState({ email: event.target.value });
  }

  /**
   * handle form submission
   * @param {Object} event event object
   * @returns {void} null
   */
  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { email } = this.state;
    const isValid = this.validate(email);

    if (!isValid) return;
    this.setState({ email: '' });
    dispatch(resetPasswordLink('/users/forgot-password', email));
  }

  /**
   * Renders the component
   * @returns {object} - Virtual DOM
   */
  render() {
    const { isLoading, success, backendError } = this.props;
    const { emailErrors, email } = this.state;

    const emailErrorMessage = emailErrors[0] ? emailErrors
      .map((error, index) => <li key={index}>{error}</li>) : [''];

    const serverResponse = { message: '', style: '' };

    if (backendError.status) {
      serverResponse.message = serverErrorResponse(backendError);
      serverResponse.style = 'errorMessage';
    }
    if (success.status) {
      serverResponse.message = 'Check your email and click the'
      + ' provided link to reset your password';
      serverResponse.style = 'successMessage';
    }

    return (
      <div>
        <ForgotPasswordForm
          handleSubmit={this.handleSubmit}
          handleInput={this.handleInput}
          isLoading={isLoading}
          serverResponse={serverResponse}
          emailErrorMessage={emailErrorMessage}
          email={email}
          success={success.status}
        />
      </div>
    );
  }
}

export const mapStateToProps = ({
  resetPasswordLink: { isLoading, success, error },
}) => ({
  isLoading,
  success,
  backendError: error
});


ForgotPassword.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  success: PropTypes.shape({
    status: PropTypes.bool.isRequired,
  }).isRequired,
  backendError: PropTypes.shape({
    status: PropTypes.bool.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ForgotPassword);
