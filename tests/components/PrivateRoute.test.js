import { shallow, mount } from 'enzyme';
import React from 'react';
import { Router, Redirect } from 'react-router-dom';

import { PrivateRoute, mapStateToProps } from '../../src/components/routes/PrivateRoute';

describe('The Guest Route component', () => {
  const auth = {
    token: 'token'
  };
  describe('Testing mapStateToProps function', () => {
    it('should map state to props', () => {
      const componentState = mapStateToProps({ auth });
      expect(componentState).toEqual(auth);
    });
  });
  describe('Testing Guest Route component itself', () => {
    it('should render a passed in component if there is a token', () => {
      const Comp = () => (
        <p>hello</p>
      );
      const history = {
        location: {
          pathname: '/'
        },
        listen: () => {}
      };
      const output = PrivateRoute({ token: auth.token, component: Comp });
      const wrapper = mount(<Router history={history}>{output}</Router>);
      expect(wrapper.contains(<p>hello</p>)).toEqual(true);
    });
  });
});
