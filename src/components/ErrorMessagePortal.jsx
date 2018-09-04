import React from 'react';
import { TransitionablePortal, Segment, Header } from 'semantic-ui-react';
import propTypes from 'prop-types';
import '../../public/styles/ErrorMessagePortal.scss';

const ErrorMessagePortal = ({
  open, animation, duration,
  errorTitle, errorMessages, onHide
}) => (
  <TransitionablePortal
    open={open}
    transition={{ animation, duration }}
    onHide={onHide}

  >
    <Segment
      id="errorPortal"
    >
      <Header>{errorTitle}</Header>
      {errorMessages.map((message, index) => <p key={index}>{message}</p>)}
    </Segment>
  </TransitionablePortal>
);


ErrorMessagePortal.propTypes = {
  animation: propTypes.string,
  open: propTypes.bool,
  duration: propTypes.number,
  errorTitle: propTypes.string,
  errorMessages: propTypes.arrayOf(propTypes.string),
  onHide: propTypes.func
};

ErrorMessagePortal.defaultProps = {
  animation: 'fly up',
  open: false,
  duration: 500,
  errorTitle: 'An Error Occured',
  errorMessages: [],
  onHide: () => {}
};


export default ErrorMessagePortal;
