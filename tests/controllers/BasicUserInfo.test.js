
/* eslint max-len: off */
import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import BasicUserInfo from '../../src/components/BasicUserInfo';

describe('Testing the BasicUserInfo Component', () => {
  let mountedObj;
  let divContainer;

  describe('the contents that the Component renders', () => {
    beforeEach(() => {
      mountedObj = shallow(<BasicUserInfo />);
      divContainer = mountedObj.find('div');
    });

    it('sshould render component', () => {
      shallow(<BasicUserInfo />);
    });

    it('should render a div', () => {
      chai.expect(mountedObj.find('div').length).eql(1);
    });
    it('the div should contain an img', () => {
      chai.expect(divContainer.find('img').length).eql(1);
    });
    it('the div should contain an strong tag with text', () => {
      chai.expect(divContainer.find('strong').length).eql(1);
    });
  });

  describe('the props that is required for the app to work', () => {
    describe('when the inputed props are valid', () => {
      const user = {
        username: 'Oguejiofor',
        image: 'userImage'
      };
      it('should render the user.username property in the strong tag', () => {
        mountedObj = shallow(<BasicUserInfo username={user.username} />);
        chai.expect(mountedObj.find('strong').text())
          .to.equal(user.username);
      });
      it('should render the user.image property in the img src attribute', () => {
        mountedObj = shallow(<BasicUserInfo image={user.image} />);
        chai.expect(mountedObj.find('img').prop('src'))
          .to.equal(user.image);
      });
      it('should render usename and image when both are specified', () => {
        mountedObj = shallow(<BasicUserInfo username={user.username} image={user.image} />);
        chai.expect(mountedObj.find('img').prop('src'))
          .to.equal(user.image);
        chai.expect(mountedObj.find('strong').text())
          .to.equal(user.username);
      });

      it('should render a default image link when the image is missing', () => {
        mountedObj = shallow(<BasicUserInfo />);
        chai.expect(mountedObj.find('img').prop('src'))
          .to.equal('defaultImageUrl');
      });
    });
  });
});
