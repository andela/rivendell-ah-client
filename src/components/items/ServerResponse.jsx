import React from 'react';
import { Message } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

/**
   * @param {String} serverResponse the response message
   * @param {Boolean} isSuccess true if success message other false
   * @returns {Object} virtual DOM
   */
export const ServerResponse = ({ serverResponse, success }) => (success ? (
  <Message positive>
    <h4 className="response">{serverResponse}</h4>
  </Message>
)
  : (
    <Message negative>
      <h4 className="response">{serverResponse}</h4>
    </Message>
  ));

ServerResponse.propTypes = {
  success: PropTypes.bool.isRequired,
  serverResponse: PropTypes.string.isRequired,
};

export default ServerResponse;
