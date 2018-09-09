
/* eslint max-len: off */
import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import EditArticleControls from '../../src/components/EditArticleControls';
import CategoryInput from '../../src/components/CategoryInput';
import TagInput from '../../src/components/TagInput';

describe('Testing EditArticleControls', () => {
  let mountedObj;


  describe('basic elements rendered in the component', () => {
    it('should contain a CategoryInput', () => {
      mountedObj = shallow(<EditArticleControls />);
      chai.expect(mountedObj.find(CategoryInput).length)
        .to.equal(1);
    });
    it('should contain a TagInput', () => {
      mountedObj = shallow(<EditArticleControls />);
      chai.expect(mountedObj.find(TagInput).length)
        .to.equal(1);
    });
  });

  describe('the controls contained in the component', () => {

  });
});
