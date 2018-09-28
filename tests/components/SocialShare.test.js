import { shallow } from 'enzyme';
import chai from 'chai';
import React from 'react';
import { Button } from 'semantic-ui-react';
import SocialShare from '../../src/components/SocialShare';


const getMountedObj = (articleUrl = '') => shallow(
  <SocialShare articleUrl={articleUrl} />
);
describe('Testing the SocialShare component', () => {
  describe('the components rendered', () => {
    it('should render three anchor tags', () => {
      chai.expect(getMountedObj().find('a').length)
        .to.equal(3);
    });
    it('should render three Button(s) tags', () => {
      chai.expect(getMountedObj().find(Button).length)
        .to.equal(3);
    });
    it('should match snapshots', () => {
      expect(getMountedObj()).toMatchSnapshot();
    });
  });

  describe('the props of the anchors ', () => {
    it('there should be an anchor twiiter link', () => {
      chai.expect(getMountedObj()
        .find('a[href^="https://twitter.com/intent/tweet"]').length)
        .to.equal(1);
    });
    it('there should be an anchor with facebook link', () => {
      chai.expect(getMountedObj()
        .find('a[href^="https://www.facebook.com/dialog/share?"]').length)
        .to.equal(1);
    });
    it('there should be an anchor with facebook link', () => {
      chai.expect(getMountedObj()
        .find('a[href^="https://www.linkedin.com/shareArticle?"]').length)
        .to.equal(1);
    });
  });
});
