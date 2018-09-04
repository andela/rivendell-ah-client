
/* eslint max-len: off */
import { shallow } from 'enzyme';
import React from 'react';
import CategoryInput from '../../src/components/CategoryInput';


describe('TagInput Component', () => {
  describe('the Dropdown element that is rendered without props', () => {
    let mountedObj;
    beforeEach(() => {
      mountedObj = shallow(<CategoryInput />);
    });
    it('should contain a Dropdown', () => {
      expect(mountedObj).toMatchSnapshot();
    });
  });
});
