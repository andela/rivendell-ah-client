import React, { Component } from 'react';
import { Button, Input, Container } from 'semantic-ui-react';

import { connect } from 'react-redux';
import CategoryInput from './CategoryInput';
import TagInput from './TagInput';
import SmartEditor from './SmartEditor';
import createArticle from '../actions/createArticle';
import loadCategories from '../actions/loadCategories';


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

    const { loadCategories } = props;

    const initialTagOptions = [
      { key: 'Art', text: 'Art', value: 'Art' },
      { key: 'Science', text: 'Science', value: 'Science' },
      { key: 'Life', text: 'Life', value: 'Life' },
    ];

    this.state = {
      tags: [],
      body: '',
      title: '',
      category: '',
      description: '',
      tagOptions: initialTagOptions,
    };

    loadCategories();
    this.onBodyChange = this.onBodyChange.bind(this);
    this.submit = this.submit.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
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
      body: newArticleBody
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
    const { tagOptions } = this.state;
    this.setState({
      tagOptions: [{ key: value, text: value, value }, ...tagOptions],
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
   *@returns {void} return nothing
    @param {function} e event handler
   */
  submit = (e) => {
    e.preventDefault();
    const { persistArticle } = this.props;
    const { title, body, tags, description, category } = this.state;

    persistArticle({ title, description, body, tags, category });
  }

  /**
   *This updates the category once it is selected in the dropdown
   * makes changes to the title input
   * @param {object} e the event handler
   * @param {object} param1 an object taht contains the value
   * @returns {void} return nothing
   */
  updateCategory(e, { value }) {
    this.setState({
      category: value,
    });
  }

  /**
   *This updates the description once it is
   changed in the description input box
   * @param {object} e the event handler
   * @param {object} param1 an object taht contains the value
   * @returns {void} return nothing
   */
  updateDescription(e, { value }) {
    this.setState({
      description: value
    });
  }

  /**
   *This updates the title in the state when the user
   * makes changes to the title input
   * @param {object} e the event handler
   * @param {object} param1 an object taht contains the value
   * @returns {void} return nothing
   */
  updateTitle(e, { value }) {
    this.setState({
      title: value,
    });
  }


  /**
   * This returns a group of custom components that
   *@returns {JSX} a JSX to be rendered
   */
  render() {
    const { tagOptions } = this.state;
    const { categories } = this.props;
    return (
      <Container>
        <Input
          placeholder="Title"
          onChange={this.updateTitle}
          error
        />

        <Input
          placeholder="Description"
          onChange={this.updateDescription}
        />
        <TagInput
          options={tagOptions}
          hadleAddition={this.handleAddition}
          handleChange={this.handleChange}
        />
        <CategoryInput
          categories={categories}
          onChange={this.updateCategory}
        />
        <SmartEditor
          onValueChange={this.onBodyChange}
        />

        <Button
          primary
          content="Create Article"
          onClick={this.submit}
          positive
        />
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  createArticleState: state.createArticle,
  categories: state.loadCategories.categories,

});
const mapDispatchToProps = dispatch => ({
  persistArticle: (article) => {
    dispatch(createArticle(article));
  },
  loadCategories: () => {
    dispatch(loadCategories());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(EditControls);
