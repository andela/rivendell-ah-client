import { shallow } from 'enzyme';
import React from 'react';

import { Login, mapStateToProps } from '../../src/views/auth/Login';

describe('The Login component', () => {
  describe('Testing mapStateToProps', () => {
    it('should map the state to the props correctly', () => {
      const auth = {
        isLoading: true,
        errors: {
          message: '',
          response: {}
        }
      }
      const state = { auth };
      const componentState = mapStateToProps(state);
      expect(componentState).toEqual(auth);
    });
  });
  describe('Testing component methods', () => {
    const props = {
      login: () => {},
      clearAllApiValidationErrors: () => {},
      isLoading: false,
      errors: {
        message: '',
        response: {
          email: ['invalid']
        }
      }
    }
    const loginComponent = shallow(<Login
        login={props.login}
        clearAllApiValidationErrors={props.clearAllApiValidationErrors}
        isLoading={props.isLoading}
        errors={props.errors}
      />);
    describe('Testing componentDidMount', () => {
      it('should call componentDidMount on loading the page', () => {
        jest.spyOn(Login.prototype, 'componentDidMount');
        shallow(<Login
          login={props.login}
          clearAllApiValidationErrors={props.clearAllApiValidationErrors}
          isLoading={props.isLoading}
          errors={props.errors}
        />);
        expect(Login.prototype.componentDidMount.mock.calls.length).toEqual(1);
      });
    });
    describe('Testing componentDidMount', () => {
      it('should call componentDidMount on loading the page', () => {
        props.errors.response = {};
        jest.spyOn(Login.prototype, 'componentDidMount');
        shallow(<Login
          login={props.login}
          clearAllApiValidationErrors={props.clearAllApiValidationErrors}
          isLoading={props.isLoading}
          errors={props.errors}
        />);
        expect(Login.prototype.componentDidMount.mock.calls.length).toEqual(2);
      });
    });
    describe('Testing handle error message dismiss function', () => {
      it('should set displayErrMsg to false', () => {
        const loginComponentInstance = loginComponent.instance();
        loginComponentInstance.handleErrMsgDismiss();
        expect(loginComponentInstance.state.displayErrMsg).toEqual(false);
      });
    });
    describe('Testing visibilityIconClick function', () => {
      it('should set visibilityIcon to \'visibility_off\' when it is \'visibility\'', () => {
        const loginComponentInstance = loginComponent.instance();
        loginComponentInstance.visibilityIconClick();
        expect(loginComponentInstance.state.visibilityIcon).toEqual('visibility_off');
      });
      it('should set visibilityIcon to \'visibility\' when it is \'visibility_off\'', () => {
        const loginComponentInstance = loginComponent.instance();
        loginComponentInstance.visibilityIconClick();
        expect(loginComponentInstance.state.visibilityIcon).toEqual('visibility');
      });
    });
    describe('Testing handle submit function', () => {
      it('should call validate and set displayErrMsg to true when the valid form data is provided', () => {
        const loginComponentInstance = loginComponent.instance();
        loginComponentInstance.state.formData = {
          email: 'validEmai@gmail.com',
          password: 'pass',
        }
        const spy = jest.spyOn(loginComponentInstance, 'validate');
        loginComponentInstance.state.displayErrMsg = false;
        loginComponentInstance.handleSubmit({ preventDefault: () => {} });
        expect(spy).toHaveBeenCalled();
        expect(loginComponentInstance.state.displayErrMsg).toEqual(true);
      });
    });
    describe('Testing handle submit function', () => {
      it('should call validate and not set displayErrMsg to true indicating invalid form data', () => {
        const loginComponentInstance = loginComponent.instance();
        loginComponentInstance.state.formData = {
          email: '',
          password: '',
        }
        const spy = jest.spyOn(loginComponentInstance, 'validate');
        loginComponentInstance.state.displayErrMsg = false;
        loginComponentInstance.handleSubmit({ preventDefault: () => {} });
        expect(spy).toHaveBeenCalled();
        expect(loginComponentInstance.state.displayErrMsg).toEqual(false);
      });
    });
    describe('Testing handle change function', () => {
      it('It should update the local state of the component and the form error state', () => {
        const loginComponentInstance = loginComponent.instance();
        loginComponentInstance.state.formValidationErrors = {
          errorCount: 1,
          email: ['Please enter a valid email']
        }
        const event = {
          target: {
            name: 'email',
            value: 'update@gmail.com',
            placeholder: 'Email'
          }
        }
        loginComponentInstance.handleChange(event);
        expect(loginComponentInstance.state.formData.email).toEqual(event.target.value);
        expect(loginComponentInstance.state.formValidationErrors.email.length).toEqual(0);
      });
    });
    describe('Testing handle change function', () => {
      it('It should update the local state of the component', () => {
        const loginComponentInstance = loginComponent.instance();
        loginComponentInstance.state.formValidationErrors = {
          errorCount: 0,
          password: ['Password is required']
        }
        const event = {
          target: {
            name: 'password',
            value: '@gmail.com',
            placeholder: 'Password'
          }
        }
        loginComponentInstance.handleChange(event);
        expect(loginComponentInstance.state.formData.password).toEqual(event.target.value);
      });
    });
  });
});
