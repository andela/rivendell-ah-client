
import React from 'react';
import { Message } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

/**
 * Displays error messages from the api in a message box
 * @param {Object} props contains {
 * apiValidationErrors(Object): the validation errors from the api
 * handleErrMsgDismiss(Function): a function called to dismiss the msg
 * displayErrMsg(Boolean): display the message when true
 * }
 * @returns {Custom} jsx or null
 */
const ApiErrorMsg = (props) => {
  const { apiValidationErrors, handleErrMsgDismiss, displayErrMsg } = props;
  // display every other message except from validation messages in the box
  if (apiValidationErrors.message
    && (Object.keys(apiValidationErrors.response) < 1)
    && displayErrMsg) {
    return (
      <Message
        onDismiss={handleErrMsgDismiss}
        negative
      >
        <Message.Header>An Error Occurred</Message.Header>
        <p>{apiValidationErrors.message}</p>
      </Message>
    );
  }
  return null;
};

ApiErrorMsg.propTypes = {
  apiValidationErrors: PropTypes.shape({
    message: PropTypes.string
  }).isRequired,
  handleErrMsgDismiss: PropTypes.func.isRequired,
  displayErrMsg: PropTypes.bool.isRequired,
};

export default ApiErrorMsg;
