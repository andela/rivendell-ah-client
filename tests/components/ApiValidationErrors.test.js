import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import ApiValidationErrors from '../../src/components/form/errors/ApiValidationErrors';

const expect = chai.expect;

describe('The API validation errors component', () => {
  it('Should return null if no error response matching the field passed is found', () => {
    const errors = {
      response: {
        email: 'email error',
      }
    }
    const field = 'password';
    const output = ApiValidationErrors({ errors, field })
    expect(output).to.be.null;
  });
  it('Should display errs message under the input field concerned', () => {
    const errors = {
      response: {
        email: ['email error1', 'email error2'],
      }
    }
    const field = 'email';
    const output = ApiValidationErrors({ errors, field });
    const errorMsgs = shallow(<ul>{output}</ul>);
    expect(errorMsgs.contains(<li key={1} >{errors.response.email[1]}</li>)).to.equal(true);
  });
  it('Should display just an err message under the input field concerned', () => {
    const errors = {
      response: {
        email: 'email error1',
      }
    }
    const field = 'email';
    const output = ApiValidationErrors({ errors, field });
    const errorMsgs = shallow(output);
    expect(errorMsgs.equals(<li>{errors.response.email}</li>));
  });
});
