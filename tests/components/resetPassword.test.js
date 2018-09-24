import React from 'react';
import { shallow } from 'enzyme';
import store from '../../src/store';
import { ForgotPassword, mapStateToProps } from '../../src/views/user/ResetPassword/ForgotPassword';
import { ResetPassword, mapStateToProps as stateToProps } from '../../src/views/user/ResetPassword/ResetPassword';
import { ForgotPasswordForm }  from '../../src/views/user/ResetPassword/ForgotPasswordForm';
import { ResetPasswordForm } from '../../src/views/user/ResetPassword/ResetPasswordForm';
import { InvalidTokenMessage  } from '../../src/views/user/ResetPassword/InvalidTokenMessage';
import { SuccessMessage } from '../../src/views/user/ResetPassword/SuccessMessage';
import { ServerResponse } from  '../../src/components/items/ServerResponse';
import { setToken } from '../../src/actions/authAction';
import { forgotPasswordResponse, resetPasswordResponse } from '../../src/helpers/responseHelpers';

const event = {
  preventDefault: ()=> 'event',
  target: {
    value: 'mppdgr@gmail.com',
  }
}

const event1 = {
  preventDefault: ()=> 'event',
  target: {
    value: 'M@kkd',
    name: 'password',
  }
}

const event2 = {
  preventDefault: ()=> 'event',
  target: {
    value: 'M@kkduiAii21',
    name: 'password',
    className: 'fa fa-eye',
    tagName: 'I',
    closest: (name) => ({
      previousSibling: {
        type: '',
      },
    })
  }
}

const event3 = {
  preventDefault: ()=> 'event',
  target: {
    value: 'M@kkduiAii21',
    name: 'confirm',
    className: 'fa fa-eye-slash',
  }
}

const input = {
  name: 'password',
  value: ''
}
const input1 = {
  name: 'password',
  value: 'value'
}

const input2 = {
  name: 'password',
  value: 'Mab123@3QD',
}

const confirmInput = {
  name: 'confirm',
  value: ''
}

const confirmInput2= {
  name: 'confirm',
  value: 'Mab123@3QD',
}

const event4 = {
  preventDefault: ()=> 'event',
  target: {
    value: '778hgtyK@ts',
    name: 'confirm',
  }
}


const history = {
  replace: (pathname) => pathname
}

const location = {
  search: '',
  pathname: ''
} 

const location2 = {
  search: 'tokentoken',
  pathname: '',
} 

const location3 = {
  search: '',
  pathname:''
}

const backendError = {
  status: false,
  message: '',
}

const backendError1 = {
  status: true,
  message: '',
  statusCode: 404
}

const backendError2 = {
  status: true,
  message: '',
  statusCode: 400
}

const errorResponse = {
  status: true,
  message: '',
  statusCode: 409
}

const errorResponse1 = {
  status: true,
  message: '',
  statusCode: 401
}

const success = {
  status: false,
  message: '',
}

const success1 = {
  status: true,
  message: '',
}

const serverResponse = {
  style: '',
  message: '',
}
const isValidToken = false;

const dispatch = (action)=>action

let disabled = true;
const password = '';
const confirm = '';
const email = '';
const emailErrorMessage = [''];

const handlePasswordVisibility = () => {};
const handleMouseLeave = () => {};
const handleSubmit = () => {};
const handleInput = () => {};
const disableAction = () => {};


const frontendValidations = {
  passwordErrorMessage: ['Password must consist of special character, uppercase, '
  + 'lowercase, number and atleast 8 characters'],
  confirmErrorMessage: ['Password does not match'], 
};

const isLoading = true;

const resetPasswordForm = shallow(
<ResetPasswordForm
success={success.status}
handleMouseLeave={handleMouseLeave}
handlePasswordVisibility={handlePasswordVisibility}
handleSubmit={handleSubmit}
disableAction={disableAction}
password={password}
confirm={confirm}
disabled={disabled}
handleInput={handleInput}
frontendValidations={frontendValidations}
isLoading={isLoading} 
disabled={disabled}
history={history} location={location}
serverResponse={serverResponse} />)

const resetPasswordForm2 = shallow(
  <ResetPasswordForm
  success={success.status}
handleMouseLeave={handleMouseLeave}
handlePasswordVisibility={handlePasswordVisibility}
handleSubmit={handleSubmit}
disableAction={disableAction}
isLoading={isLoading}
password={password}
confirm={confirm}
disabled={disabled}
  handleSubmit={handleSubmit}
  handleInput={handleInput}
  frontendValidations={frontendValidations}
  isLoading={false} 
  history={history} location={location}
  serverResponse={serverResponse} />)

describe('ForgotPasswordForm Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<ForgotPasswordForm
      isLoading={true}
      success={false}
      email={email}
      emailErrorMessage={emailErrorMessage}
      handleSubmit={handleSubmit}
      handleInput={handleInput}
      serverResponse={serverResponse}
      />).find('#email').exists()).toBe(true);
  }) 
  it('renders an email input', () => {
    expect(shallow(<ForgotPasswordForm
      isLoading={true}
      success={false}
      email={email}
      emailErrorMessage={emailErrorMessage}
      handleSubmit={handleSubmit}
      handleInput={handleInput}
      serverResponse={serverResponse}
      />).find('#email').length).toEqual(1)
   })

 })


 describe('ResetPasswordForm Component', () => {
  it('should render two input field and a button', () => {
    expect(resetPasswordForm.find('input').length).toEqual(2);
    expect(resetPasswordForm.find('button').length).toEqual(1);
  })

  it('renders a password input', () => {
    expect(resetPasswordForm2.find('#password').length).toEqual(1)
   })
   
   const success = {
     status: false,
   }
   it('renders a confirm password input', () => {
    expect(resetPasswordForm.find('#confirm').length).toEqual(1)
   })

 })


 describe('ForgotPassword Component', () => {
  it('should have a state of email and emailErrors', () => {
    const wrapper = shallow(<ForgotPassword
      backendError={backendError}
      success={success}
      isLoading={isLoading}
      dispatch={dispatch}/>);
    expect(wrapper.state('email')).toBe('');
    expect(wrapper.state('emailErrors')[0]).toBe(undefined);
    
  })

  it('should have error messages when email field is empty', () => {
    const wrapper = shallow(<ForgotPassword
      backendError={backendError}
      isLoading={isLoading}
      disabled={disabled}
      dispatch={store.dispatch}
      success={success}/>);
    const instance = wrapper.instance();
    instance.handleSubmit(event);
    expect(wrapper.state('email')).toBe('');
    expect(wrapper.state('emailErrors')[0]).toBe('Email cannot be empty');
    expect(wrapper.state('emailErrors')[1]).toBe('The email you have entered is not valid.');
  })

  it('should update state with email value when handleInput is called', () => {
    const wrapper = shallow(<ForgotPassword
      backendError={backendError}
      isLoading={isLoading}
      disabled={disabled}
      dispatch={store.dispatch}
      success={success}/>);
    const instance = wrapper.instance();
    instance.handleInput(event);
    expect(wrapper.state('email')).toBe('mppdgr@gmail.com');
      expect(wrapper.state('emailErrors')[0]).toBe(undefined);
    })

  it('should be successful when success status is true', () => {
    const wrapper = shallow(<ForgotPassword
      backendError={backendError} 
      dispatch={store.dispatch}
      isLoading={isLoading}
      disabled={disabled}
      success={success1}/>)
    const instance = wrapper.instance();
    expect(wrapper.state('email')).toBe('');
      expect(wrapper.state('emailErrors')[0]).toBe(undefined);
  })

  it('should have error message when 404 error occurs', () => {

    expect(forgotPasswordResponse(backendError1)).toBe('No user was found with provided email');
  })

  it('should have error message when 400 error occurs', () => {

    expect(forgotPasswordResponse(backendError2)).toBe('The email you entered is not valid');
    })
it('should have error message when error occurs', () => {

  expect(forgotPasswordResponse(backendError)).toBe('0ops! Something went wrong. Refresh and try again');
})

  it('should send a reset password link to email', () => {
    const wrapper = shallow(<ForgotPassword
      backendError={backendError}
      success={success}
      isLoading={isLoading}
      dispatch={store.dispatch}/>);
    const instance = wrapper.instance();
    instance.handleInput(event);
    instance.handleSubmit(event);
    expect(store.getState().resetPasswordLink.isLoading).toBe(true);
  })

  describe('ForgotPassword mapStateToProps', () => {
    it('should map the App State to the component props', () => {
      const state = {
      isLoading: true,
      success: { status: false, message: '' },
      backendError: { status: false, message: '' },
      };
      expect(mapStateToProps(store.getState())).toEqual(state);
    });
  });

 })

 describe('ResetPassword Component', () => {

  it('should have validation message when password field is empty', () => {
    const wrapper = shallow(<ResetPassword
      isValidToken={isValidToken}
      resetToken={''} 
      backendError={backendError}
      isLoading={isLoading}
      success={success} history={history}
      location={location}
      dispatch={dispatch}/>);
    const instance = wrapper.instance();
    instance.handleInput(event1);
    instance.handleMouseLeave();
    expect(wrapper.state('password')).toBe('M@kkd');
    expect(wrapper.state('frontendValidations').password[0]
    .includes('atleast 8 characters')).toBe(true);
  })

  it('should have validation message when confirm is not same as password', () => {
    const wrapper = shallow(<ResetPassword
      isValidToken={isValidToken}
      resetToken={''} 
      backendError={backendError}
      success={success}
      isLoading={isLoading}
      history={history}
      location={location}
      dispatch={dispatch} />);
    const instance = wrapper.instance();
    instance.handleInput(event1);
    instance.handleInput(event4);
    instance.handleMouseLeave(event2);
    expect(wrapper.state('frontendValidations').confirm[0]).toBe('Password does not match');
  })

  it('should update state with email value when handleInput is called', () => {
    const wrapper = shallow(<ResetPassword
      isValidToken={isValidToken}
      resetToken={''} 
      backendError={backendError}
      success={success}
      isLoading={isLoading}
      history={history}
      location={location} 
      dispatch={dispatch}/>);
    const instance = wrapper.instance();
    instance.handleInput(event2);
    instance.handleInput(event3);
    expect(wrapper.state('password')).toBe('M@kkduiAii21');
  })

  it('should submit new password and empty password field when form is submitted', () => {
    const wrapper = shallow(<ResetPassword
      isValidToken={isValidToken}
      resetToken={''} 
      backendError={backendError}
      success={success}
      isLoading={isLoading}
      history={history}
      location={location}
      dispatch={dispatch} />);
    const instance = wrapper.instance();
    instance.handleInput(event2);
    instance.handleInput(event3);
    instance.handleSubmit(event2);
    expect(wrapper.state('password')).toBe('');
    expect(wrapper.state('confirm')).toBe('');
  })

  it('should have values password and confirm state', () => {
    const wrapper = shallow(<ResetPassword
      isValidToken={isValidToken}
      resetToken={''} 
      backendError={backendError}
      isLoading={isLoading}
      success={success1}
      history={history}
      location={location}
      dispatch={store.dispatch} />);
    const instance = wrapper.instance();
    instance.handleInput(event2);
    instance.handleInput(event3);
    expect(wrapper.state('password')).toBe('M@kkduiAii21');
    expect(wrapper.state('confirm')).toBe('M@kkduiAii21');
  })


  it('should have values password and confirm state', () => {
    const wrapper = shallow(<ResetPassword
      backendError={backendError}
      isValidToken={isValidToken}
      resetToken={''} 
      success={success1}
      isLoading={isLoading}
      history={history}
      location={location}
      dispatch={store.dispatch} />);
    const instance = wrapper.instance();
    instance.handleInput(event2);
    instance.handleInput(event3);
    instance.handlePasswordVisibility(event2);
    expect(wrapper.state('password')).toBe('M@kkduiAii21');
    expect(wrapper.state('confirm')).toBe('M@kkduiAii21');
  })

  it('should toggle password visibility', () => {
    const wrapper = shallow(<ResetPassword
      backendError={backendError1}
      isValidToken={isValidToken}
      resetToken={''} 
      isLoading={isLoading}
      success={success1}
      history={history}
      location={location}
      dispatch={store.dispatch} />);
    const instance = wrapper.instance();
    instance.handlePasswordVisibility(event2);
    expect(event2.target.className).toBe('fa fa-eye');
  })

  it('should disable copy and paste action for confirm input', () => {
    const wrapper = shallow(<ResetPassword
      backendError={backendError1}
      isValidToken={isValidToken}
      resetToken={''} 
      isLoading={isLoading}
      success={success1}
      history={history}
      location={location}
      dispatch={store.dispatch} />);
    const instance = wrapper.instance();
    instance.disableAction(event2);
    expect(instance.frontendValidations.confirm[0])
    .toBe('Action not allowed on this field');
  })

  it('should have message when unknown error occurs', () => {
  
    expect(resetPasswordResponse(backendError)).toBe('0ops! Something went wrong. Refresh and try again');
  })

  it('should have message when 404 error occurs', () => {
    
    expect(resetPasswordResponse(backendError1)).toBe('No user was found');
  })

  it('should have message when 400 error occurs', () => {

    expect(resetPasswordResponse(backendError2)).toBe('The password reset token is empty');
  })

  it('should have message when 409 error occurs', () => {

    expect(resetPasswordResponse(errorResponse)).toBe('Password does not match');
  })

  it('should have message when 401 error occurs', () => {

    expect(resetPasswordResponse(errorResponse1)).toBe('The reset token has expired or is invalid');
  })

  it('should not validate if password is empty', () => {
    const wrapper = shallow(<ResetPassword
      backendError={backendError1}
      isValidToken={isValidToken}
      isLoading={isLoading}
      resetToken={''} 
      success={success1}
      history={history}
      location={location}
      dispatch={store.dispatch} />);
    const instance = wrapper.instance();
    instance.validatePassword(input);
    expect(instance.validity.passwordIsValid).toBe(false);
  })

  it('should validate if password has meets the requirement', () => {
    const wrapper = shallow(<ResetPassword
      backendError={backendError1}
      isValidToken={isValidToken}
      resetToken={''} 
      isLoading={isLoading}
      success={success1}
      history={history}
      location={location}
      dispatch={store.dispatch} />);
    const instance = wrapper.instance();
    instance.validatePassword(input2);
    expect(instance.validity.passwordIsValid).toBe(true);
  })

  it('should not validate if confirm password is empty', () => {
    const wrapper = shallow(<ResetPassword
      backendError={backendError1}
      isValidToken={isValidToken}
      success={success1}
      history={history}
      location={location}
      resetToken={''} 
      isLoading={isLoading}
      dispatch={store.dispatch} />);
    const instance = wrapper.instance();
    instance.validateConfirmPassword(confirmInput);
    expect(instance.validity.passwordIsConfirmed ).toBe(false);
  })

  it('should set state isValidToken to false if token is invalid', () => {
    const wrapper = shallow(<ResetPassword
      isValidToken={isValidToken}
      resetToken={''}
      backendError={backendError1}
      success={success1}
      history={history}
      isLoading={isLoading}
      location={location2}
      dispatch={store.dispatch} />);
    const instance = wrapper.instance();
    expect(instance.props.isValidToken).toBe(false);
  })

  it('should dispatch setToken action if token is valid', () => {
    const wrapper = shallow(<ResetPassword
      isValidToken={true}
      backendError={backendError1}
      success={success1}
      history={history}
      location={location3}
      dispatch={store.dispatch}
      isLoading={isLoading}
      resetToken={'tokenvalue'} />);
    const instance = wrapper.instance();
    expect(instance.props.resetToken).toBe('tokenvalue');
  })


  describe('ResetPassword mapStateToProps', () => {
    it('should map the state to the props correctly', () => {
      const state = {
        resetToken: '',
        isLoading: false,
        isValidToken: false,
        success: { status: false, message: '' },
        backendError: { status: false, message: '', statusCode: 0 },
      };
      expect(stateToProps(store.getState())).toEqual(state);
    });
  });

 });

 describe('SuccessMessage Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<SuccessMessage />).find('.user-message').exists()).toBe(true);
  })
})

 describe('InvalidTokenMessage Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<InvalidTokenMessage />).find('.user-message').exists()).toBe(true);
  })
})

  describe('ServerResponse Component', () => {
    it('should render without throwing an error', () => {
      const wrapper = shallow(<ServerResponse
        success={true}
        serverResponse="The message"  />)
      expect(wrapper.find('h4').exists()).toBe(true);
    })
 })

 describe('setAction Action', () => {
  it('should should dispatch a token', () => {
    const tokenAction = setToken('usertoken');
    expect(tokenAction.type).toBe('RESET_PASSWORD_TOKEN');
    expect(tokenAction.resetToken).toBe('usertoken');
  })
})