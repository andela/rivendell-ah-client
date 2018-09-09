
/* eslint max-len: off */
import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import { Image } from 'semantic-ui-react';
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
    it('the div should contain an semantic-ui-Image', () => {
      chai.expect(divContainer.find(Image).length).eql(1);
    });
    it('the div should contain an strong tag with text', () => {
      chai.expect(divContainer.find('strong').length).eql(1);
    });

    it('the rendered Image should have be circular and center-aligned', () => {
      chai.expect(divContainer.find(Image).prop('circular')).eql(true);
      chai.expect(divContainer.find(Image).prop('verticalAlign')).eql('middle');
    });
    it('the rendered Image should be small ', () => {
      chai.expect(divContainer.find(Image).prop('size')).eql('tiny');
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
      it('should render the user.image property in the Image src attribute', () => {
        mountedObj = shallow(<BasicUserInfo image={user.image} />);
        chai.expect(mountedObj.find(Image).prop('src'))
          .to.equal(user.image);
      });
      it('should render usename and image when both are specified', () => {
        mountedObj = shallow(<BasicUserInfo username={user.username} image={user.image} />);
        chai.expect(mountedObj.find(Image).prop('src'))
          .to.equal(user.image);
        chai.expect(mountedObj.find('strong').text())
          .to.equal(user.username);
      });

      it('should render a default image link when the image is missing', () => {
        mountedObj = shallow(<BasicUserInfo />);
        chai.expect(mountedObj.find(Image).prop('src'))
          .to.equal('defaultImageUrl');
      });

      it('should render a default image link when an invalid type value is specified', () => {
        mountedObj = shallow(<BasicUserInfo image={[]} />);
        chai.expect(mountedObj.find(Image).prop('src'))
          .to.equal('defaultImageUrl');
      });
    });
  });
});
