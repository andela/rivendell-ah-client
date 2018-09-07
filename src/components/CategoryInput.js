import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import categoryInputHelper from '../helpers/categoryInputHelper';

const CategoryInput = ({ categories }) => (

  <Dropdown text="Select a Category" className="link item">
    <Dropdown.Menu>
      <Dropdown.Header>Categories</Dropdown.Header>
      {categoryInputHelper(categories)}
    </Dropdown.Menu>
  </Dropdown>


);


CategoryInput.defaultProps = {
  options: [],
  currentValues: []
};
export default CategoryInput;
