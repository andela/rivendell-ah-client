import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import propTypes from 'prop-types';
import categoryInputHelper from '../helpers/categoryInputHelper';

const CategoryInput = ({ categories, onChange }) => (

  <Dropdown
    placeholder="Select a Category"
    className="link item"
    options={categoryInputHelper(categories)}
    selection
    search
    scrolling
    onChange={onChange}
  />
);


CategoryInput.propTypes = {
  categories: propTypes.arrayOf(propTypes.object),
  onChange: propTypes.func.isRequired
};

CategoryInput.defaultProps = {
  categories: [],
};
export default CategoryInput;
