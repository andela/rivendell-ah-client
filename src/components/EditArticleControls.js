import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import CategoryInput from './CategoryInput';
import TagInput from './TagInput';
import SmartEditor from './SmartEditor';

/**
 * This component manages the state of the input elements
 * to the edit Articles
 * @class EditControls
 * @returns {object} instance of an object
 * @param {object} e
 */
class EditControls extends Component {
  /**
   *This instantiates the state of this component
   * @param {object} props the properties passed to it as argument
   */
  constructor(props) {
    super(props);
    this.state = {
      currentValues: [],
      tags: [
        { key: 'English', text: 'English', value: 'English' },
        { key: 'French', text: 'French', value: 'French' },
        { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
      ],
    };

    this.categories = [
      {
        name: 'OTHERS',
        subcategories: [
          {
            id: 1,
            name: 'OTHERS'
          }
        ]
      },
      {
        name: 'TECH',
        subcategories: [
          {
            id: 2,
            name: 'ENGINEERING'
          },
          {
            id: 3,
            name: 'SOFTWARE DEVELOPMENT'
          },
          {
            id: 4,
            name: 'ARTIFICIAL INTELLIGENCE'
          },
          {
            id: 5,
            name: 'BIOTECHNOLOGY'
          },
          {
            id: 6,
            name: 'NANO TECHNOLOGY'
          }
        ]
      },
    ];
  }


  /**
   *this function is called when a new field is inserted
    to the tags in while the user is creating articles
  @returns {void} this function performs an action and
  thus returns nothig
  @param {object} e the event handler object
   */
  handleAddition = (e, { value }) => {
    const { tags } = this.state;
    this.setState({
      tags: [{ key: value, text: value, value }, ...tags],
    });
  }

  /**
   *this function is called when the value of the
  tag changes
  @returns {void} this function performs an action and
  thus returns nothig
  @param {object} e the event handler object
   */
  handleChange = (e, { value }) => this.setState({ currentValues: value })


  /**
   * This returns a group of custom components that
   *@returns {JSX} a JSX to be rendered
   */
  render() {
    const { tags, currentValues } = this.state;
    return (
      <div>
        <TagInput
          options={tags}
          hadleAddition={this.handleAddition}
          handleChange={this.handleChange}
          currentValues={currentValues}
        />
        <CategoryInput categories={this.categories} />
        <Button primary content="Create Article" />
        <SmartEditor />
      </div>
    );
  }
}
export default EditControls;
