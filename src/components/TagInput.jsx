import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import propTypes from 'prop-types';

const TagInput = ({
  options, hadleAddition, handleChange
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
  />
);


TagInput.defaultProps = {
  options: [],
};


TagInput.propTypes = {
  options: propTypes.arrayOf(propTypes.object),
  hadleAddition: propTypes.func.isRequired,
  handleChange: propTypes.func.isRequired
};

export default TagInput;
