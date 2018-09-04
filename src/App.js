import React, { Component } from 'react';

import { Button, Input } from 'semantic-ui-react';


/**
 *This class is the main entry point for the application
 */
class App extends Component {
  /**
   *Returns JSX of that is used to test the app
   @returns {ReactElement} returns a JSX
   */
  render() {
    return (
      <div>
        <p>Rivendell Author's Haven frontend project </p>
        <Button content="Primary" primary />
        <Button content="Secondary" secondary />
        <Input
          loading
          icon="user"
          iconPosition="left"
          placeholder="Search..."
        />
        <Input loading icon="user" placeholder="Search..." />
      </div>
    );
  }
}


export default App;
