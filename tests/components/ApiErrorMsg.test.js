import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import ApiErrorMsg from '../../src/components/form/errors/ApiErrorMsg';

const expect = chai.expect;

describe('The API error message component', () => {
  it('Should return null if no error message is present', () => {
    const output = ApiErrorMsg({
      apiValidationErrors: {}
    });
    expect(output).to.be.null;
  });
  it('Should display an err message when an error message is passed, and the conditions are met', () => {
    const dismissErrMsg = () => {};
    const apiValidationErrors = {
      message: 'Error!!!',
      response: {}
    };
    const output = ApiErrorMsg({
      apiValidationErrors,
      handleErrMsgDismiss: dismissErrMsg, 
      displayErrMsg: true
    });
    const errorMsg = shallow(output);
    expect(errorMsg.contains(<p>{apiValidationErrors.message}</p>)).to.equal(true);
  });
});
