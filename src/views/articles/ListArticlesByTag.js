import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';

const ItemExampleDivided = ({ content }) => (
  <Item.Group divided>
    {content}
  </Item.Group>
);

ItemExampleDivided.propTypes = {
  content: PropTypes.shape({}).isRequired,
};

export default ItemExampleDivided;
