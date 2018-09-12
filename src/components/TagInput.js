import React from 'react';
import { Dropdown } from 'semantic-ui-react';


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
  currentValues: []
};
export default TagInput;
