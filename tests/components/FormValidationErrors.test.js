import { shallow } from 'enzyme';
import React from 'react';
import FormValidationErrors from '../../src/components/form/errors/FormValidationErrors'

describe('The Form Validation Errors component', () => {
  it('Should render an un-ordered list of errors', () => {
    const props = {
      errors: {
        errCount: 0,
        login: ['1', '2']
      },
      errorType: 'login'
    }
    const output = FormValidationErrors({ errors: props.errors, errorType: props.errorType });
    const errors = shallow(<ul>{output}</ul>);
    expect(errors.contains(<li key={0}>{props.errors.login[0]}</li>)).toEqual(true);
  });
});
