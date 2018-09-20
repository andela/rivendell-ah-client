import React, { Component } from 'react';
import { Popup } from 'semantic-ui-react';

const PopComponent = props => (
  <Popup
    trigger={props.trigger}
    flowing
    hoverable
    size="tiny"
    position="bottom left"
  >
    {props.content}
  </Popup>
);

export default PopComponent;
