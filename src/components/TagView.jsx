
import React from 'react';
import { Label } from 'semantic-ui-react';
import propTypes from 'prop-types';

const TagView = ({ tagNames, colors }) => (
  <div id="tags">
    {tagNames.map(tag => (
      <Label
        key={tag}
        icon="tag"
        as="a"
        size="big"
        content={{ tag }}
        color={colors[Math.floor(Math.random() * colors.length)]}
      />
    ))}
  </div>

);
TagView.propTypes = {
  tagNames: propTypes.arrayOf(propTypes.string),
  colors: propTypes.arrayOf(propTypes.string)
};
TagView.defaultProps = {
  tagNames: [],
  colors: [],
};

export default TagView;
