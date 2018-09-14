import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FormInputWithIcon from '../../components/form/FormInputWithIcon';
import FormWrapper from '../../components/form/FormWrapper';
import FormErrors from '../../components/form/errors/FormErrors';
import ApiErrorMsg from '../../components/form/errors/ApiErrorMsg';
import SocialLogin from '../../components/SocialLogin';

const LoginForm = (props) => {
  const {
    handleChange, handleSubmit, handleErrMsgDismiss,
    isLoading, apiValidationErrors, displayErrMsg,
    formValidationErrors, formData, socialMedia
  } = props;
  return (
    <FormWrapper
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      iconName="person"
      formType="login"
      headerText="Login"
    >
      <ApiErrorMsg
        apiValidationErrors={apiValidationErrors}
        handleErrMsgDismiss={handleErrMsgDismiss}
        displayErrMsg={displayErrMsg}
      />
      <div id="social-login">
        <SocialLogin socialMedia={socialMedia} />
      </div>
      <Form.Field error={formValidationErrors.email.length > 0}>
        <FormInputWithIcon
          handleChange={handleChange}
          value={formData.email}
          name="email"
          type="email"
          iconName="email"
          placeholder="Email"
        >
          <FormErrors
            apiValidationErrors={apiValidationErrors}
            formValidationErrors={formValidationErrors}
            errorType="email"
          />
        </FormInputWithIcon>
      </Form.Field>
      <Form.Field error={formValidationErrors.password.length > 0}>
        <FormInputWithIcon
          handleChange={handleChange}
          value={formData.password}
          name="password"
          type="password"
          iconName="lock"
          placeholder="Password"
        >
          <FormErrors
            apiValidationErrors={apiValidationErrors}
            formValidationErrors={formValidationErrors}
            errorType="password"
          />
        </FormInputWithIcon>
      </Form.Field>
      <Button size="medium" fluid>Login</Button>
      <Link to="/forget-password" className="forget-password">
        Forgot password?
      </Link>
      <div className="clear-fix">{}</div>
    </FormWrapper>
  );
};

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleErrMsgDismiss: PropTypes.func.isRequired,
  apiValidationErrors: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  displayErrMsg: PropTypes.bool.isRequired,
  formValidationErrors: PropTypes.shape({
    errorCount: PropTypes.number.isRequired,
  }).isRequired,
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  socialMedia: PropTypes.array.isRequired
};

export default LoginForm;
