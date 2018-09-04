
/* eslint max-len: off */
import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import { TransitionablePortal } from 'semantic-ui-react';
import ErrorMessagePortal from '../../src/components/ErrorMessagePortal';

describe('ErrorMessagePortal', () => {
  describe('components rendered', () => {
    it('should render a sematic-ui TransitionablePortal', () => {
      const mountedObj = shallow(<ErrorMessagePortal />);
      chai.expect(mountedObj.find(TransitionablePortal).length)
        .to.equal(1);
    });

    it('should render many paragraphs when errorMessages array is specified', () => {
      const errorMessages = [
        'testing',
        'prevents',
        'errors'
      ];
      const mountedObj = shallow(<ErrorMessagePortal errorMessages={errorMessages} />);
      chai.expect(mountedObj.find('p').length)
        .to.equal(errorMessages.length);
    });
  });

  describe('the functions in the compnent', () => {
    it('should  call onHide when an onHide action occurs in TransitionablePortal', () => {
      const spy = jest.fn();
      const mountedObj = shallow(<ErrorMessagePortal onHide={spy} />);
      mountedObj.find(TransitionablePortal)
        .simulate('hide');
      expect(spy).toHaveBeenCalled();
    });

    it('should  call onHide when an onHide action occurs in TransitionablePortal', () => {
      const spy = jest.fn();
      const mountedObj = shallow(<ErrorMessagePortal onHide={spy} />);
      mountedObj.find(TransitionablePortal)
        .simulate('hide');
      expect(spy).toHaveBeenCalled();
    });

    it('should not throw any errors when an onHide occurs in the portal but the handler is not specified', () => {
      const mountedObj = shallow(<ErrorMessagePortal />);
      mountedObj.find(TransitionablePortal)
        .simulate('hide');
    });
  });
});
