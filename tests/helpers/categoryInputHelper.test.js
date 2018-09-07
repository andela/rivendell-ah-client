
import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import { Dropdown } from 'semantic-ui-react';
import categoryInputHelper from '../../src/helpers/categoryInputHelper';
import mockData from '../mockData';
/* eslint max-len: off */
describe('the pure function categoryInputHelper', () => {
  describe('when given an array of catetfories', () => {
    it('should return an array of JSX that is equal to the length of the array', () => {
      const categoryJSXArray = categoryInputHelper(
        mockData.categories
      );
      chai.expect(categoryJSXArray.length)
        .to.equal(mockData.categories.length);
    });
  });

  describe('the values in the array that is rendered', () => {
    const mountedObj = shallow(
      <div>
        {categoryInputHelper(mockData.categories)}
      </div>
    );
    it('should contain a Dropdown.Item(s)', () => {
      chai.expect(mountedObj.find(Dropdown).length)
        .gte(1);
      chai.expect(mountedObj.find(Dropdown.Item).length)
        .gte(1);
    });

    it('should match the existing snapshot', () => {
      expect(mountedObj).toMatchSnapshot(); //eslint-disable-line
    });
  });
});
