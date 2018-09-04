import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';
import ServerResponse from '../../../components/items/ServerResponse';

/**
 * ForgotPassword form
 * @param {object} props the component properties
 * @returns {object} virtual DOM object
 */
export function ForgotPasswordForm(props) {
  const {
    isLoading,
    handleInput,
    handleSubmit,
    emailErrorMessage,
    serverResponse,
    success,
    email,
  } = props;

  const response = (
    <ServerResponse
      serverResponse={serverResponse.message}
      success={success}
    />
  );

  const formTitleIcon = (
    <Icon
      name="address book"
      circular
      inverted
      color="blue"
      className="formTitleIcon"
    />
  );

  return (


    <div className={isLoading ? 'wait' : 'pointer'}>

      <div className="user-form">
        <Form
          loading={isLoading}
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <span className="formTitleIcon">
              {formTitleIcon}
            </span>
          </div>
          <h4 className="text-center">
          Enter Email
          </h4>
          <p className="text-center">
          to recieve password reset link
          </p>
          <div className="seperator" />
          <div className="responseMessage">
            {serverResponse.message ? response : ''}
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-envelope" />
              </span>
              <input
                id="email"
                type="email"
                onChange={handleInput}
                value={email}
                className="form-control"
                placeholder="Email"
                required="required"
              />
            </div>
          </div>
          <div className="form-group">
            <ul className="errorMessage">
              { emailErrorMessage }
            </ul>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block user-btn"
            >
              Send Reset Password Link
            </button>
          </div>

        </Form>
      </div>

    </div>


  );
}

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  emailErrorMessage: PropTypes.instanceOf(Array).isRequired,
  serverResponse: PropTypes.shape({
    message: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
  }).isRequired,
};

export default ForgotPasswordForm;
