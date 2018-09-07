import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';


const options = [
  { key: 'English', text: 'English', value: 'English' },
  { key: 'French', text: 'French', value: 'French' },
  { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
  { key: 'German', text: 'German', value: 'German' },
  { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
];
const EditControls = () => (
  <Button.Group>
    <Dropdown
      options={options}

      search
      selection
      multiple
      allowAdditions
    />

  </Button.Group>


);

// {/* {buttons instanceof Array ? buttons.map((button, index) => (
//       <Button
//         content={button.content}
//         key={index}
//         secondary={!!button.secondary}
//         primary={!!button.primary}
//         positive={!!button.positive}
//       />)) : null} */}
export default EditControls;
