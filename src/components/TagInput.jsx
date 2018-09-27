import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import propTypes from 'prop-types';

const TagInput = ({
  options, hadleAddition, handleChange, value
}) => (
  <Dropdown
    options={options}
    selection
    search
    allowAdditions
    multiple
    placeholder="Add Tag ..."
    onAddItem={hadleAddition}
    onChange={handleChange}
    value={value}
  />
);


TagInput.defaultProps = {
  options: [],
  value: []
};


TagInput.propTypes = {
  options: propTypes.arrayOf(propTypes.object),
  hadleAddition: propTypes.func.isRequired,
  handleChange: propTypes.func.isRequired,
  value: propTypes.arrayOf(propTypes.string),
};

export default TagInput;
