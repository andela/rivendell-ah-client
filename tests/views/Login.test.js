import { shallow } from 'enzyme';
import React from 'react';
import { Login, mapStateToProps } from '../../src/views/auth/Login';
import mockData from '../config/mockData';

const { searchParams } = mockData;
const location = { search: searchParams };
const history = {
  replace: (string) => {
    return null;
  }
}
const props = {
  login: () => { },
  clearAllApiValidationErrors: () => { },
  isLoading: false,
  errors: {
    message: '',
    response: {
      email: ['invalid']
    }
  }
}
const shallowRender = () => (
  shallow(<Login
    history={history}
    socialLoginRedirect={() => { }}
    socialLogin={() => { }}
    location={location}
    login={props.login}
    clearAllApiValidationErrors={props.clearAllApiValidationErrors}
    isLoading={props.isLoading}
    errors={props.errors}
  />)
)

describe('The Login component', () => {
  describe('Testing mapStateToProps', () => {
    it('should map the state to the props correctly', () => {
      const state = {
        auth: {
          isLoading: true,
          errors: {
            message: '',
            response: {}
          },
          token: '',
        },
        redirect: {
          redirectUrl: '/'
        }
      };
      const componentState = mapStateToProps(state);
      expect(componentState).toEqual({ isLoading: state.auth.isLoading, errors: state.auth.errors, redirectUrl: state.redirect.redirectUrl, token: state.auth.token });
    });
  });
  describe('Testing component methods', () => {
    const loginComponent = shallowRender();
    describe('Testing componentDidMount', () => {
      it('should call componentDidMount on loading the page', () => {
        jest.spyOn(Login.prototype, 'componentDidMount');
        shallowRender();
        expect(Login.prototype.componentDidMount.mock.calls.length).toEqual(1);
      });
    });
    describe('Testing componentWillUnmount', () => {
      jest.spyOn(Login.prototype, 'componentWillUnmount')
      const wrapper = shallowRender();
      expect(Login.prototype.componentWillUnmount.mock.calls.length).toBe(0)
      wrapper.unmount(<Login history={history} socialLoginRedirect={() => { }} socialLogin={() => { }} location={location}
        login={props.login} clearAllApiValidationErrors={props.clearAllApiValidationErrors} isLoading={props.isLoading}
        errors={props.errors} />)
      expect(Login.prototype.componentWillUnmount.mock.calls.length).toBe(1)
    })
    describe('Testing componentDidMount', () => {
      it('should call componentDidMount on loading the page', () => {
        props.errors.response = {};
        jest.spyOn(Login.prototype, 'componentDidMount');
        shallowRender();
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
      const event = {
        target: {
          tagName: 'I'
        }
      }
      it('should set visibilityIcon to \'visibility_off\' when it is \'visibility\'', () => {
        const loginComponentInstance = loginComponent.instance();
        loginComponentInstance.visibilityIconClick(event);
        expect(loginComponentInstance.state.visibilityIcon).toEqual('visibility_off');
      });
      it('should set visibilityIcon to \'visibility\' when it is \'visibility_off\'', () => {
        const loginComponentInstance = loginComponent.instance();
        loginComponentInstance.visibilityIconClick(event);
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
        loginComponentInstance.handleSubmit({ preventDefault: () => { } });
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
        loginComponentInstance.handleSubmit({ preventDefault: () => { } });
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
  it('Should render all elements properly', () => {
    shallowRender();
  });
});
