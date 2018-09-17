import React from 'react';
import { PropTypes } from 'prop-types';
import { Item, Button, Icon } from 'semantic-ui-react';

export const RatersList = (props) => {
  const { content, handleShowMore, handleShowPrevious,
    showPreviousIcon, disableShowMore } = props;
  return (
    <div className="itemList">
      <div className={showPreviousIcon ? 'showMore' : 'hide'}>
        <Icon
          className="pointer"
          color="blue"
          name="chevron up"
          size="large"
          onClick={handleShowPrevious}
        />
      </div>
      <Item.Group>
        {content}
      </Item.Group>
      <div className="showMore">
        <Button
          color="teal"
          onClick={handleShowMore}
          disabled={disableShowMore}
          basic
          size="tiny"
        >
          Show More...
        </Button>
      </div>
    </div>
  );
};

RatersList.propTypes = {
  handleShowMore: PropTypes.func.isRequired,
  handleShowPrevious: PropTypes.func.isRequired,
  showPreviousIcon: PropTypes.bool.isRequired,
  disableShowMore: PropTypes.bool.isRequired,
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RatersList;
