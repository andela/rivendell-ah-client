
import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Container } from 'semantic-ui-react';
import FormHeaderIcon from './FormHeaderIcon';
import AuthFormFooter from './AuthFormFooter';

/**
 * a reusable form wrapper component, that
 * provides custom styles
 * @param {Object} props contains:
 * {
 * handleSubmit(func): handle form submit
 * isLoading(bool): loading indicator
 * formType(string): login, signup etc...
 * iconName(string): name of materialize icon
 * headerText(string): h2 at the top of the form
 * children(node): jsx
 * @returns {Function} jsx
 * }
 */
const FormWrapper = (props) => {
  const {
    handleSubmit, isLoading, children,
    formType, iconName, headerText
  } = props;
  return (
    <div id={formType}>
      <Container>
        <div className="content">
          <div className="form">
            <Form loading={isLoading} onSubmit={handleSubmit}>
              <FormHeaderIcon iconName={iconName} />
              <h2>{headerText}</h2>
              {children}
            </Form>
          </div>
          <AuthFormFooter authType={formType} />
        </div>
      </Container>
    </div>
  );
};

FormWrapper.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node,
  formType: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  iconName: PropTypes.string
};

FormWrapper.defaultProps = {
  iconName: '',
  children: null
};

export default FormWrapper;
