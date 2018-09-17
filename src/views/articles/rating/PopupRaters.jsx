import React from 'react';
import { PropTypes } from 'prop-types';
import { Popup } from 'semantic-ui-react';

export const PopupRaters = (props) => {
  const { trigger, content } = props;
  return (
    <Popup
      trigger={trigger}
      flowing
      hoverable
      size="tiny"
      position="bottom left"
    >
      {content}
    </Popup>
  );
};

PopupRaters.propTypes = {
  trigger: PropTypes.shape({
  }).isRequired,
  content: PropTypes.shape({
  }).isRequired,
};

export default PopupRaters;
