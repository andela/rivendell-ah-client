import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';

import { connect } from 'react-redux';
import CategoryInput from './CategoryInput';
import TagInput from './TagInput';
import SmartEditor from './SmartEditor';
import createArticle from '../actions/createArticle';

const categories = [
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

    this.initialTagOptions = [
      { key: 'Art', text: 'Art', value: 'Art' },
      { key: 'Science', text: 'Science', value: 'Science' },
      { key: 'Life', text: 'Life', value: 'Life' },
    ];

    this.state = {
      tags: [],
      articleBody: '',
      title: '',
      category: ''
    };
    this.categories = categories;
    this.onBodyChange = this.onBodyChange.bind(this);
    this.submit = this.submit.bind(this);
  }


  /**
   *This method updates the article body based on what
   the user had inputed
   * @param {string} newArticleBody this contains html from
   * the smartEditor
   * @returns {void}
   */
  onBodyChange(newArticleBody) {
    this.setState({
      articleBody: newArticleBody
    });
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
  handleChange = (e, { value }) => this.setState({ tags: value })

  /**
   *
   * Called when the createArticle button is clicked
   *@returns {void}
   */
  submit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(createArticle({
      article: {
        title: 'The bad ass title',
        description: 'what ',
        body: 'hat the body'
      }
    }));
  }

  /**
   * This returns a group of custom components that
   *@returns {JSX} a JSX to be rendered
   */
  render() {
    const { tags } = this.state;
    return (
      <div>
        <TagInput
          options={this.initialTagOptions}
          hadleAddition={this.handleAddition}
          handleChange={this.handleChange}
          currentValues={tags}
        />
        <CategoryInput categories={this.categories} />
        <Button
          primary
          content="Create Article"
          onClick={this.submit}
        />
        <Input
          placeholder="Title"
          fluid
        />
        <SmartEditor
          onValueChange={this.onBodyChange}
        />
      </div>
    );
  }
}

// connect(a,)


export default connect(null)(EditControls);
