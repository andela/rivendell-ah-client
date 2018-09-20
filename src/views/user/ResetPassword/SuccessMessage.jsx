
import React from 'react';
import { Link } from 'react-router-dom';
import { Message, Icon, Button } from 'semantic-ui-react';


export const SuccessMessage = () => (
  <div className="user-message">
    <Message positive>
      <Message.Header className="response">
      Your password has been successfully updated.
      </Message.Header>
      <h3 className="response">Procceed to login</h3>
      <p className="text-center"><Icon name="angle double down" /></p>
      <Button
        fluid
        basic
        color="blue"
        size="massive"
      >
        <Link to="/login">Login</Link>
      </Button>
    </Message>
  </div>

);

export default SuccessMessage;
