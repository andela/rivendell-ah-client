import React, { Component } from 'react';
import { Button, Input, Container, Loader }
  from 'semantic-ui-react';

import { connect } from 'react-redux';
import CategoryInput from './CategoryInput';
import TagInput from './TagInput';
import SmartEditor from './SmartEditor';
import createArticle from '../actions/createArticle';
import loadCategoriesAction from '../actions/loadCategories';
import ErrorMessagePortal from './ErrorMessagePortal';

/**
 * This component manages the state of the input elements
 * to the edit Articles
 * @class EditControls
 * @returns {object} instance of an object
 * @param {object} e
 */
export class EditArticleControls extends Component {
  /**
   *This instantiates the state of this component
   * @param {object} props the properties passed to it as argument
   */
  constructor(props) {
    super(props);

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

    this.switchToEditing = this.switchToEditing.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.submit = this.submit.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateTags = this.updateTags.bind(this);
  }


  /**
   * called immediately after the component has mounted
   *@returns {void} performs an action and returns nothing
   */
  componentDidMount() {
    const { loadCategories } = this.props;
    loadCategories();
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
  updateTags(e, { value }) {
    this.setState({ tags: value });
  }

  /**
   *
   * Called when the createArticle button is clicked
   *@returns {void} return nothing
   */
  submit() {
    const { persistArticle } = this.props;
    const { title, body, tags, description, category } = this.state;

    console.log('Finally called submit');
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
   * This dispatches an action to switch the state of this page
   * to editing mode
   * @returns {void} performs an action and returns void
   */
  switchToEditing() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  /**
   * This returns a group of custom components that
   *@returns {JSX} a JSX to be rendered
   */
  render() {
    const { tagOptions } = this.state;
    const { categories, isLoading, errors } = this.props;

    const errorMessages = [];
    if (errors.title) {
      errorMessages.push(...errors.title);
    }

    if (errors.description) {
      errorMessages.push(...errors.description);
    }

    if (errors.body) {
      errorMessages.push(...errors.body);
    }
    return (
      <Container>

        <ErrorMessagePortal

          onHide={this.switchToEditing}
          open={!!errors.status}
          errorTitle="An error occured while making request"
          errorMessages={errorMessages}
        />
        <Input
          placeholder="Title"
          onChange={this.updateTitle}
          error={!!errors.title}
        />

        <Input
          placeholder="Description"
          onChange={this.updateDescription}
          error={!!errors.description}
        />
        <TagInput
          options={tagOptions}
          hadleAddition={this.handleAddition}
          handleChange={this.updateTags}
        />
        <CategoryInput
          categories={categories}
          onChange={this.updateCategory}
        />
        <Loader active={isLoading} inline content="Loading" />
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


export const mapStateToProps = state => ({
  ...state.createArticleReducer,
  categories: state.loadCategoriesReducer.categories,

});
export const mapDispatchToProps = dispatch => ({
  persistArticle: (article) => {
    dispatch(createArticle(article));
  },
  loadCategories: () => {
    dispatch(loadCategoriesAction());
  },
  clearErrors: () => {
    dispatch({ type: 'CREATE_ARTICLE_EDITING' });
  }
});


export default connect(mapStateToProps,
  mapDispatchToProps)(EditArticleControls);
