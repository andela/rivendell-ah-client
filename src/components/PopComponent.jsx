import React from 'react';
import { PropTypes } from 'prop-types';
import { Popup } from 'semantic-ui-react';

const PopupComponent = (props) => {
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
PopupComponent.propTypes = {
  trigger: PropTypes.element.isRequired,
  content: PropTypes.node,
};
PopupComponent.defaultProps = {
  content: '',
};

export default PopupComponent;
