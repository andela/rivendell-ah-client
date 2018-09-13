import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import FormWrapper from '../../components/form/FormWrapper';
import FormInputWithIcon from '../../components/form/FormInputWithIcon';
import FormErrors from '../../components/form/errors/FormErrors';
import ApiErrorMsg from '../../components/form/errors/ApiErrorMsg';
import SocialLogin from '../../components/SocialLogin';

/**
 * Signup
 * @param {Object} props props obj
 * @returns {Function} jsx
 */
const SignupForm = (props) => {
  const {
    isLoading,
    signUpErrors,
    validationErrors,
    formData,
    displayErrMsg,
    handleErrMsgDismiss,
    handleSubmit,
    handleChange,
    passwordVisibilityIcon,
    confirmVisibilityIcon,
    visibilityIconClick,
    socialMedia,
  } = props;

  return (
    <FormWrapper
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      iconName="person"
      formType="signup"
      headerText="Sign up"
    >
      <div id="social-login">
        <SocialLogin socialMedia={socialMedia} />
      </div>
      <div className="or-separator"><i>or</i></div>
      <ApiErrorMsg
        apiValidationErrors={signUpErrors}
        handleErrMsgDismiss={handleErrMsgDismiss}
        displayErrMsg={displayErrMsg}
      />
      <Form.Field
        error={
          !!signUpErrors.response.firstName
          || validationErrors.firstName.length > 0
        }
      >
        <FormInputWithIcon
          handleChange={handleChange}
          value={formData.firstName}
          name="firstName"
          type="text"
          iconName="person"
          placeholder="First name"
        >
          <FormErrors
            apiValidationErrors={signUpErrors}
            formValidationErrors={validationErrors}
            errorType="firstName"
          />
        </FormInputWithIcon>
      </Form.Field>
      <Form.Field
        error={
          !!signUpErrors.response.lastName
          || validationErrors.lastName.length > 0
        }
      >
        <FormInputWithIcon
          handleChange={handleChange}
          value={formData.lastName}
          name="lastName"
          type="text"
          iconName="person"
          placeholder="Last name"
        >
          <FormErrors
            apiValidationErrors={signUpErrors}
            formValidationErrors={validationErrors}
            errorType="lastName"
          />
        </FormInputWithIcon>
      </Form.Field>
      <Form.Field
        error={
          !!signUpErrors.response.email || validationErrors.email.length > 0
        }
      >
        <FormInputWithIcon
          handleChange={handleChange}
          value={formData.email}
          name="email"
          type="email"
          iconName="email"
          placeholder="Email"
        >
          <FormErrors
            apiValidationErrors={signUpErrors}
            formValidationErrors={validationErrors}
            errorType="email"
          />
        </FormInputWithIcon>
      </Form.Field>
      <Form.Field
        error={
          !!signUpErrors.response.username
          || validationErrors.username.length > 0
        }
      >
        <FormInputWithIcon
          handleChange={handleChange}
          value={formData.username}
          name="username"
          type="text"
          iconName="person_pin"
          placeholder="Username"
        >
          <FormErrors
            apiValidationErrors={signUpErrors}
            formValidationErrors={validationErrors}
            errorType="username"
          />
        </FormInputWithIcon>
      </Form.Field>
      <Form.Field
        error={
          !!signUpErrors.response.password
          || validationErrors.password.length > 0
        }
      >
        <FormInputWithIcon
          handleChange={handleChange}
          value={formData.password}
          name="password"
          type={
            passwordVisibilityIcon === 'visibility_off'
              ? 'text' : 'password'
          }
          iconName="lock"
          placeholder="Password"
          visibilityIcon={passwordVisibilityIcon}
          visibilityIconClick={visibilityIconClick}

        >
          <FormErrors
            apiValidationErrors={signUpErrors}
            formValidationErrors={validationErrors}
            errorType="password"
          />
        </FormInputWithIcon>
      </Form.Field>
      <Form.Field
        error={
          !!signUpErrors.response.confirm
          || validationErrors.confirm.length > 0
        }
      >
        <FormInputWithIcon
          handleChange={handleChange}
          value={formData.confirm}
          name="confirm"
          type={
            confirmVisibilityIcon === 'visibility_off'
              ? 'text' : 'password'
          }
          iconName="lock"
          placeholder="Confirm password"
          visibilityIcon={confirmVisibilityIcon}
          visibilityIconClick={visibilityIconClick}
        >
          <FormErrors
            apiValidationErrors={signUpErrors}
            formValidationErrors={validationErrors}
            errorType="confirm"
          />
        </FormInputWithIcon>
      </Form.Field>
      <Button size="medium" fluid>
        Sign up
      </Button>
    </FormWrapper>
  );
};

SignupForm.propTypes = {
  handleErrMsgDismiss: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  displayErrMsg: PropTypes.bool.isRequired,
  signUpErrors: PropTypes.shape({}).isRequired,
  validationErrors: PropTypes.shape({}).isRequired,
  formData: PropTypes.shape({}).isRequired,
  passwordVisibilityIcon: PropTypes.string,
  confirmVisibilityIcon: PropTypes.string,
  visibilityIconClick: PropTypes.func,
  socialMedia: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    link: PropTypes.string,
    text: PropTypes.string,
    divClass: PropTypes.string,
    iconClass: PropTypes.string,
  })),
};

SignupForm.defaultProps = {
  passwordVisibilityIcon: '',
  confirmVisibilityIcon: '',
  visibilityIconClick: () => {},
  socialMedia: []
};

export default SignupForm;
