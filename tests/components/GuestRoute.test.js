import { shallow, mount } from 'enzyme';
import React from 'react';
import { Router, Redirect } from 'react-router-dom';

import { GuestRoute, mapStateToProps } from '../../src/components/routes/GuestRoute';

describe('The Guest Route component', () => {
  const state = {
    auth: {
      token: '',
    },
    redirect: {
      redirectUrl: '/'
    }
  };
  describe('Testing mapStateToProps function', () => {
    it('should map state to props', () => {
      const componentState = mapStateToProps(state);
      expect(componentState).toEqual({ redirectUrl: state.redirect.redirectUrl, token: state.auth.token });
    });
  });
  describe('Testing Guest Route component itself', () => {
    it('should render a passed in component if there is no token', () => {
      // auth.token = '';
      state.auth.token = '';
      const Comp = () => (
        <p>hello</p>
      );
      const history = {
        location: {
          pathname: '/'
        },
        listen: () => {}
      };
      const output = GuestRoute({ token: state.auth.token, component: Comp });
      const wrapper = mount(<Router history={history}>{output}</Router>);
      expect(wrapper.contains(<p>hello</p>)).toEqual(true);
    });
  });
});
