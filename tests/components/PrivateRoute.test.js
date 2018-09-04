import { shallow, mount } from 'enzyme';
import React from 'react';
import { Router, Redirect } from 'react-router-dom';

import { PrivateRoute, mapStateToProps } from '../../src/components/routes/PrivateRoute.jsx';

describe('The Guest Route component', () => {
  const auth = {
    token: 'token',
   
  };
  const  profile = {userProfile: {verified: true}}
  describe('Testing mapStateToProps function', () => {
    it('should map state to props', () => {
      const componentState = mapStateToProps({ auth,profile });
      expect(componentState).toEqual({ ...auth, ...profile.userProfile });
    });
  });
  describe('Testing Guest Route component itself', () => {
    it('should render a passed in component if there is a token', () => {
      const Comp = () => (
        <p>hello</p>
      );
      const history = {
        location: {
          pathname: '/',
        },
        replace: () =>{},
        listen: () => {}
      };
      const output = PrivateRoute({ token: auth.token, component: Comp, verified: profile.userProfile.verified });
      const wrapper = mount(<Router history={history}>{output}</Router>);
      expect(wrapper.contains(<p>hello</p>)).toEqual(true);
    });
  });
});
