import { shallow } from 'enzyme';
import React from 'react';
import FormInputWithIcon from '../src/components/form/FormInputWithIcon';
import Footer from '../src/components/Footer';
import FormWrapper from '../src/components/form/FormWrapper';
import FormErrors from '../src/components/form/errors/FormErrors';
import LoginForm from '../src/views/forms/LoginForm';

describe('The Form Input With Icon component', () => {
  it('Should render as expected', () => {
    const props = {
      handleChange: () => {},
      value: "validemail@gmail.com",
      type: "email",
      iconName: "email",
      name: "email",
      placeholder: "Email"
    };
    // const output = FormInputWithIcon(props).toJson();
    const tree = shallow(<FormInputWithIcon
        handleChange={props.handleChange}
        value={props.value}
        type={props.type}
        iconName={props.iconName}
        name={props.name}
        placeholder={props.placeholder}
      />);
    expect(tree).toMatchSnapshot();
  });
});

describe('The Footer component', () => {
  it('Should render as expected', () => {
    const footer = shallow(<Footer />);
    expect(footer).toMatchSnapshot();
  });
});

describe('The Form Wrapper component', () => {
  it('Should render as expected', () => {
  const props = {
    handleSubmit: () => {},
    isLoading: false,
    formType: "login",
    headerText: "Login",
    iconName: "person",
  }
    const tree = shallow(<FormWrapper
      handleSubmit={props.handleSubmit}
      formType={props.formType}
      isLoading={props.isLoading}
      headerText={props.headerText}
      iconName={props.iconName}  
    />);
    expect(tree).toMatchSnapshot();
  });
});

describe('The Form Errors component', () => {
  it('Should render as expected', () => {
    const props = {
      formValidationErrors: {
        errorCount: 0,
      },
      apiValidationErrors: {
        message: '',
      },
      errorType: 'login'
    }
    const tree = shallow(<FormErrors
      formValidationErrors={props.formValidationErrors}
      apiValidationErrors={props.apiValidationErrors}
      errorType={props.errorType}  
    />);
    expect(tree).toMatchSnapshot();
  });
});

describe('The Login Form component', () => {
  it('Should render as expected', () => {
    const props = {
      handleChange: () => {},
      handleSubmit: () => {},
      handleErrMsgDismiss: () => {},
      isLoading: false,
      apiValidationErrors: {
        message: '',
        response: {}
      },
      displayErrMsg: true,
      formValidationErrors: {
        errorCount: 0,
        email: [],
        password: []
      },
      formData: {
        email: '',
        password: ''
      },
      socialMediaPlatforms:[]
    }
    const tree = shallow(<LoginForm
      handleChange={props.handleChange}
      handleSubmit={props.handleSubmit}
      handleErrMsgDismiss={props.handleErrMsgDismiss}
      isLoading={props.isLoading}
      apiValidationErrors={props.apiValidationErrors}
      displayErrMsg={props.displayErrMsg}
      formValidationErrors={props.formValidationErrors}
      formData={props.formData}
      socialMedia={props.socialMediaPlatforms}
    />);
    expect(tree).toMatchSnapshot();
  });
});
