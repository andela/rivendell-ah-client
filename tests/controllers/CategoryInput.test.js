
/* eslint max-len: off */
import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import { Dropdown } from 'semantic-ui-react';
import CategoryInput from '../../src/components/CategoryInput';


describe('TagInput Component', () => {
  describe('the Dropdown element that is rendered without props', () => {
    let mountedObj;
    beforeEach(() => {
      mountedObj = shallow(<CategoryInput />);
    });
    it('should contain a Dropdown', () => {
      chai.expect(mountedObj.find(Dropdown).length)
        .to.equal(1);
    });
    it('should contain a Menu.Item', () => {
      chai.expect(mountedObj.find(Dropdown.Menu).length)
        .to.equal(1);
    });
  });
});
