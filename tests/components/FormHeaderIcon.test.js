import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import FormHeaderIcon from '../../src/components/form/FormHeaderIcon';

const expect = chai.expect;

describe('The form header icon component', () => {
  it('Should return null no icon name was passed as props', () => {
    const output = FormHeaderIcon({});
    expect(output).to.be.null;
  });
  it('Should display a icon if icon name is passed as props', () => {
    const output = FormHeaderIcon({ iconName: 'person' });
    const footer = shallow(output);
    expect(footer.find('div').childAt(0).type()).to.equal('i');
    expect(footer.contains(<i className="material-icons top">person</i>)).to.equal(true);
  });
});
