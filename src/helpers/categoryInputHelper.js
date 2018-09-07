import React from 'react';
import { Dropdown } from 'semantic-ui-react';


/**
 * This function takes an array of categories
 * and wraps these categories in a Dropdown.Item
 * with their corresponding subcategories
 * @param {Array} categories
 * @return {JSX} returns a JSX
 */
function categoryInputHelper(categories) {
  return categories.map(category => (
    <Dropdown.Item key={category.name}>
      <Dropdown text={category.name.substring(0, 5)} scrolling>
        <Dropdown.Menu>
          <Dropdown.Header>SubCatg</Dropdown.Header>
          {category.subcategories.map(subcategory => (
            <Dropdown.Item
              value={subcategory.name}
              key={subcategory.id}
            >
              {subcategory.name.substring(0, 9)}

            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Dropdown.Item>
  ));
}


export default categoryInputHelper;
