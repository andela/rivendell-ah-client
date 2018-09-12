
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
    const event = { target: { name: 'pollName', value: 'spam' } };

    const wrapper = mount(<TagInput />);
    const handleChangeSpy = spyOn(TagInput.prototype, 'handleChange');
    // expect(handleChangeSpy.calledOnce).to.equal(true);

    wrapper.find(Dropdown).simulate('change');

    expect(handleChangeSpy.calledOnce()).to.equal(true);
  });
});
