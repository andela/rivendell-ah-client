import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';
import ServerResponse from '../../../components/items/ServerResponse';
import SuccessMessage from './SuccessMessage';

/**
 * ResetPasswordForm
 * @param {object} props the component properties
 * @returns {object} virtual DOM object
 */
export function ResetPasswordForm(props) {
  const {
    isLoading,
    handleInput,
    handleSubmit,
    frontendValidations,
    serverResponse,
    success,
    handlePasswordVisibility,
    handleMouseLeave,
    disabled,
    password,
    confirm,
    disableAction,
  } = props;

  const {
    passwordErrorMessage,
    confirmErrorMessage
  } = frontendValidations;

  const response = (
    <ServerResponse
      serverResponse={serverResponse.message}
      success={success}
    />
  );

  const formTitleIcon = (
    <Icon
      name="edit"
      circular
      inverted
      color="blue"
      className="formTitleIcon"
    />
  );

  return !success ? (
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
          <h3 className="text-center">
          Enter New Password
          </h3>
          <div className="seperator" />
          <div className="responseMessage">
            {serverResponse.message ? response : ''}
          </div>

          <div className="form-group">
            <div onClick={handlePasswordVisibility} className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-lock" />
              </span>
              <input
                id="password"
                type="password"
                onMouseLeave={handleMouseLeave}
                onBlur={handleMouseLeave}
                onChange={handleInput}
                value={password}
                className="form-control"
                name="password"
                placeholder="Password"
                required="required"
              />
              <span className="input-group-addon eye">
                <i className="fa fa-eye" />
              </span>
            </div>
          </div>
          <div className="form-group">
            <ul className="errorMessage">
              { passwordErrorMessage[0] }
            </ul>
          </div>
          <div className="form-group">
            <div onClick={handlePasswordVisibility} className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-lock" />
              </span>
              <input
                id="confirm"
                type="password"
                onChange={handleInput}
                onMouseLeave={handleMouseLeave}
                onBlur={handleMouseLeave}
                onPaste={disableAction}
                onCopy={disableAction}
                onContextMenu={disableAction}
                value={confirm}
                className="form-control"
                name="confirm"
                placeholder="Confirm Password"
                required="required"
              />
              <span className="input-group-addon eye">
                <i className="fa fa-eye" />
              </span>
            </div>
          </div>
          <div className="form-group">
            <ul className="errorMessage">
              { confirmErrorMessage[0] }
            </ul>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block user-btn"
              disabled={disabled}
            >
              Submit New Password
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
    : (<div><SuccessMessage /></div>);
}

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  handlePasswordVisibility: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  disableAction: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  password: PropTypes.string.isRequired,
  confirm: PropTypes.string.isRequired,
  serverResponse: PropTypes.shape({
    message: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
  }).isRequired,
  frontendValidations: PropTypes.shape({
    passwordErrorMessage: PropTypes.instanceOf(Array).isRequired,
    confirmErrorMessage: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
};

export default ResetPasswordForm;
