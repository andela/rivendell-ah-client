import { shallow } from 'enzyme';
import React from 'react';
import { Header, mapStateToProps } from '../../src/components/Header';

describe('The Header component', () => {
  describe('Testing mapStateToProps', () => {
    it('should map the state to the props correctly', () => {
      const auth = {
        token: 'token'
      }
      const profile = {
        profile: {
          firstName: 'firstName',
          image: 'img',
          username: 'megame'
        }
      }
      const state = { auth, profile };
      const componentState = mapStateToProps(state);
      expect(componentState).toEqual({
        ...auth, ...profile.profile
      });
    });
  });
  describe('Testing component methods', () => {
    const props = {
      history: {
        listen: (cb) => {
          cb();
        }
      },
      logout: () => 'logout called',
      firstName: 'firstName',
      token: 'token',
      username: 'username',
      image: 'img',
    }
    const headerComponentUnrendered = <Header
        history={props.history}
        logout={props.logout}
        firstName={props.firstName}
        token={props.token}
        username={props.username}
        image={props.image}
    />;
    const headerComponent = shallow(headerComponentUnrendered);
    describe('Testing componentDidMount', () => {
      it('should call componentDidMount on loading the page', () => {
        jest.spyOn(Header.prototype, 'componentDidMount');
        shallow(headerComponentUnrendered);
        expect(Header.prototype.componentDidMount.mock.calls.length).toEqual(1);
      });
    });
    describe('Testing the logout method', () => {
      it('should call this.props.logout', () => {
        const headerComponentInstance = headerComponent.instance();
        const output =  headerComponentInstance.logout();
        expect(output).toEqual('logout called');
      });
    });
    describe('Testing profileImgClick method', () => {
      const headerComponentInstance = headerComponent.instance();
      it('should set showDropDown to true if it is false', () => {
        headerComponentInstance.profileImgClick();
        expect(headerComponentInstance.state.showDropDown).toEqual(true);
      });
      it('should set showDropDown to false if it is false', () => {
        headerComponentInstance.profileImgClick();
        expect(headerComponentInstance.state.showDropDown).toEqual(false);
      });
    });
    describe('Testing slideOUt method', () => {
      const headerComponentInstance = headerComponent.instance();
      it('should fade out the overlay and animate the side menu out of the screen', (done) => {
        headerComponentInstance.slideOut();
        expect(headerComponentInstance.state.sideMenuStyles).toEqual({
          animationName: 'slide-out', right: '-300px'
        });
        setTimeout(() => {
          expect(headerComponentInstance.state.overlayStyles).toEqual({
            animationName: 'disappear', opacity: 0, display: 'none'
          });
          done();
        }, 400)
      });
    });
    describe('Testing slideIn method', () => {
      const headerComponentInstance = headerComponent.instance();
      it('should fade out the overlay and animate the side menu out of the screen', () => {
        headerComponentInstance.slideIn();
        expect(headerComponentInstance.state.sideMenuStyles).toEqual({
          animationName: 'slide-in', right: '0px'
        });
        expect(headerComponentInstance.state.overlayStyles).toEqual({
          animationName: 'appear', opacity: 1, display: 'block'
        });
      });
    });
  });
});
