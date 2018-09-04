
import React from 'react';
import { Label } from 'semantic-ui-react';
import propTypes from 'prop-types';

const TagView = ({ tagNames, colors }) => (
  <div>
    {tagNames.map(tag => (
      <Label
        key={tag}
        tag
        as="a"
        size="big"
        color={colors[Math.floor(Math.random() * colors.length)]}
      >
        {tag}
      </Label>
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
