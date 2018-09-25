import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Input, Container, Image, Form, Message, TextArea }
  from 'semantic-ui-react';

import { connect } from 'react-redux';
import propTypes from 'prop-types';
import CategoryInput from './CategoryInput';
import TagInput from './TagInput';
import SmartEditor from './SmartEditor';
import loadCategoriesAction from '../actions/loadCategories';
import uploadImageAction from '../actions/uploadImageAction';

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
      imagePath: ''
    };

    this.fileInput = null;
    this.textFileInput = null;

    this.createImageFileRef = (element) => {
      this.fileInput = element;
    };

    this.imageFileReader = new FileReader();


    this.switchToEditing = this.switchToEditing.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.submit = this.submit.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }


  /**
   * called immediately after the component has mounted
   *@returns {void} performs an action and returns nothing
   */
  componentDidMount() {
    const { loadCategories, uploadImage, article, update } = this.props;
    loadCategories();
    this.imageFileReader.addEventListener('load', () => {
      this.setState({
        imagePath: this.imageFileReader.result,
      });
      uploadImage(this.imageFileReader.result);
    });
    if (update) {
      this.setState({
        ...article,
        imagePath: ''
      });
    }
  }

  /**
   * update state when the slug value exists in the
   * article
   * @returns {void} performs an action and returns
   * nothing
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    const { article: newArticle } = nextProps;
    const { article: currentArticle, update } = this.props;

    if (update && currentArticle.slug !== newArticle.slug) {
      this.setState({
        ...newArticle,
      });
    }
  }


  /**
   * this resets the page once the component is about
   * to unmount
   * @returns {void} resets the page to how it was initially
   */
  componentWillUnmount() {
    const { resetPage } = this.props;
    resetPage();
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
      body: newArticleBody,
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
    const { image } = this.props;
    const { title, body, tags, description, category } = this.state;
    const article = { title, description, body, tags, category };

    const { onSubmit } = this.props;
    article.image = image;
    onSubmit(article);
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
      title: value.toUpperCase(),
    });
  }


  /**
   * This dispatches an action to switch the state of this page
   * to editing mode
   * @returns {void} performs an action and returns void
   */
  switchToEditing() {
    const { resetPage } = this.props;
    resetPage();
  }


  /**
   * this simulates the clicking of the file
   * <input> component
   *@returns {void} performs an action
   */
  selectImage() {
    if (this.fileInput) {
      this.fileInput.click();
    }
  }


  /**
   * this method runs anytime the user selects a new
   * file from using the <inpu type="file "/>
   *@returns {void} performs an action
   */
  handleImageChange({ target: { files } }) {
    this.imageFileReader.readAsDataURL(files[0]);
  }


  /**
   * This returns a group of custom components that
   *@returns {JSX} a JSX to be rendered
   */
  render() {
    const {
      categories, isLoading, errors, success, article,
      update, saveToStore } = this.props;


    const {
      tagOptions, imagePath, title,
      description, tags,
      currentBodyValue
    } = this.state;

    const errorMessages = [];

    Object.values(errors).forEach((error) => {
      if (Array.isArray(error)) {
        errorMessages.push(...error);
      }
    });

    if (success) {
      saveToStore(article);
      return <Redirect to={`/articles/${article.slug}`} />;
    }


    const errorMessage = (
      <Message
        author
        error
        header="There was some errors with your submission"
        list={errorMessages}
        visible={!!errorMessages.length}
      />
    );
    return (
      <div id="editArticleControls">

        <Container>
          {errorMessages.length ? errorMessage : null}
          <Form loading={isLoading}>

            <Input
              placeholder="Title"
              onChange={this.updateTitle}
              error={!!errors.title}
              fluid
              value={title}
            />

            <TextArea
              placeholder="Description"
              onChange={this.updateDescription}
              style={{ minHeight: 100 }}
              value={description}
            />

            <CategoryInput
              categories={categories}
              onChange={this.updateCategory}
            />
            <div>
              <TagInput
                options={tagOptions}
                hadleAddition={this.handleAddition}
                handleChange={this.updateTags}
                fluid
                value={tags}
              />
            </div>


            <Button
              id="file-button"
              icon="upload"
              content="Upload Image"
              as="a"
              onClick={this.selectImage}
            />

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={this.handleImageChange}
              ref={this.createImageFileRef}
            />
            <Button
              id="submit-button"
              primary
              content={update ? 'Upate Article' : 'Create Article'}
              onClick={this.submit}
            />
            <Image
              size="small"
              src={imagePath}
              className="image"
            />
            <SmartEditor
              onValueChange={this.onBodyChange}
              initialHtml={update ? article.body : undefined}
              value={currentBodyValue}
            />
          </Form>
        </Container>

      </div>
    );
  }
}


EditArticleControls.propTypes = {
  loadCategories: propTypes.func.isRequired,
  resetPage: propTypes.func,
  uploadImage: propTypes.func,
  categories: propTypes.arrayOf(propTypes.object),
  isLoading: propTypes.bool,
  errors: propTypes.objectOf(propTypes.string),
  success: propTypes.bool,
  article: propTypes.shape({
    author: propTypes.object,
    title: propTypes.string,

  }),
  image: propTypes.string,
  onSubmit: propTypes.func.isRequired,
  update: propTypes.bool,
  saveToStore: propTypes.func,
};

EditArticleControls.defaultProps = {
  resetPage: () => {},
  uploadImage: () => {},
  saveToStore: () => {},
  categories: [],
  isLoading: false,
  errors: {},
  success: false,
  article: {},
  image: '',
  update: false
};

export const mapStateToProps = state => ({
  categories: state.loadCategoriesReducer.categories,
  uploadImageReducer: state.uploadImageReducer,
  isLoading: state.uploadImageReducer.isLoading
   || state.createArticleReducer.isLoading,
  image: state.uploadImageReducer.imageUrl,
  currentUserProfile: state.profile.userProfile,
});

export const mapDispatchToProps = dispatch => ({
  uploadImage: (imagePath) => {
    dispatch(uploadImageAction(imagePath));
  },
  loadCategories: () => {
    dispatch(loadCategoriesAction());
  },
  resetPage: () => {
    dispatch({ type: 'CREATE_ARTICLE_EDITING' });
    dispatch({ type: 'UPDATE_ARTICLE_EDITING' });
  },
  saveToStore: (article) => {
    dispatch({
      type: 'LOAD_ARTICLE_SAVE',
      payload: article
    });
  }
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditArticleControls);
