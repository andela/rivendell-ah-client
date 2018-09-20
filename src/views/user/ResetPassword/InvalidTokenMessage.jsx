
import React from 'react';
import { Link } from 'react-router-dom';
import { Message, Icon, Button } from 'semantic-ui-react';


export const InvalidTokenMessage = () => (
  <div className="user-message">
    <Message negative>
      <Message.Header className="response">
      You have not provided a valid token.
      </Message.Header>
      <h3 className="response">
      Click the button below to get a password reset link
      </h3>
      <p className="text-center"><Icon name="angle double down" /></p>
      <Button
        fluid
        basic
        color="blue"
        size="massive"
      >
        {<Link to="/forgot-password">Get Reset Password Link</Link>}
      </Button>
    </Message>
  </div>

);

export default InvalidTokenMessage;
