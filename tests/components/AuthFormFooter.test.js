import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import AuthFormFooter from '../../src/components/form/AuthFormFooter';

const expect = chai.expect;

describe('The Authentication form footer component', () => {
  it('Should display a <p> tag footer on the login form', () => {
    const output = AuthFormFooter({ authType: 'login' });
    const footer = shallow(output);
    expect(footer.find('div').childAt(0).type()).to.equal('p');
  });
  it('Should display a <p> tag footer on the for form', () => {
    const output = AuthFormFooter({ authType: 'signup' });
    const footer = shallow(output);
    expect(footer.find('div').childAt(0).type()).to.equal('p');
  });
});
