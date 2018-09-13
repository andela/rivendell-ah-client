
/* eslint max-len: off */
import { shallow, mount } from 'enzyme';
import React from 'react';
import chai from 'chai';
import { Dropdown } from 'semantic-ui-react';
import jest from 'jest';
import TagInput from '../../src/components/TagInput';

describe('TagInput Component', () => {
  describe('the Dropdown element that is rendered without props', () => {
    let mountedObj;
    beforeEach(() => {
      mountedObj = shallow(<TagInput />);
    });
    it('should contain a Dropdown', () => {
      chai.expect(mountedObj.find(Dropdown).length)
        .to.equal(1);
    });
    it('the Dropdown should contain allowAdditions', () => {
      chai.expect(mountedObj.find('Dropdown[allowAdditions=true]').length)
        .to.equal(1);
    });
    it('the Dropdown should allow multiple selections', () => {
      chai.expect(mountedObj.find('Dropdown[multiple=true]').length)
        .to.equal(1);
    });
    it('the Dropdown have a placeholder that equals "Add Tag ..."', () => {
      chai.expect(mountedObj.find('Dropdown[placeholder="Add Tag ..."]').length)
        .to.equal(1);
    });
  });

  describe('the Dropdown when props are specified', () => {
    let mountedObj;
    it('should have options when options is specified', () => {
      const options = [
        { key: 'tagId1', text: 'age', value: 'age' },
        { key: 'tagId2', text: 'name', value: 'name' }
      ];
      mountedObj = shallow(<TagInput options={options} />);

      chai.expect(mountedObj.find('Dropdown').prop('options'))
        .to.equal(options);
    });
  });

  describe('the event handler', () => {
    it('should call the change handler when a change occurs in the dropdown', () => {
      const options = [
        { key: 'tagId1', text: 'age', value: 'age' },
        { key: 'tagId2', text: 'name', value: 'name' }
      ];

      let called = false;
      const handleChange = () => {
        called = true;
      };
      const wrapper = shallow(<TagInput
        options={options}
        handleChange={handleChange}
      />);
      wrapper.find(Dropdown).simulate('change');

      chai.expect(called).to.equal(true);
    });
  });
});
