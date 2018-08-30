import React, {Component} from 'react'; 

import { Button, Input } from 'semantic-ui-react';

export default class App extends Component {
    render() {
      return( 
        <div>
          <p>Rivendell Author's Haven frontend project </p>
          <Button content = 'Primary' primary />
          <Button content = 'Secondary' secondary />
          <Input loading icon='user' iconPosition='left' placeholder='Search...' />
          <Input loading icon='user' placeholder='Search...' />
        </div>
      );
    }
  }
  