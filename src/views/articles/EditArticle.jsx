import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import EditArticleControls from '../../components/EditArticleControls';
import updateArticleAction from '../../actions/updateArticleAction';
import loadArticleAction from '../../actions/loadArticleAction';


/**
 * This component manages the state of the input elements
 * to the edit Articles
 * @class NewArticle
 * @returns {object} instance of an object
 */
export class EditArticle extends Component {
  /**
   * creates an instance of a NewArticle and binds the
   * methods to the this
   * @param {object} props contains the props sent from thd parent
   */
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  /**
   *called once this component has mounted successfully to
   the dom
   @returns {void}  performs an action and returns nothning
   */
  componentDidMount() {
    const { loadArticle, match: { params } } = this.props;
    loadArticle(params.slug);
  }


  /**
   *
   * This function is called when the the user
   * tries to submit the article
   * @returns {void} performs an action and returns nothing
   * @param {object} article contains information about the
   * article
   */
  handleSubmit(article) {
    const { updateArticle, match: { params } } = this.props;
    const { slug } = params;
    updateArticle(article, slug);
  }

  /**
   * this renders html
   * @returns {void} renders html an returns nothing
   */
  render() {
    const { loadedArticle, success } = this.props;


    return (
      <Container>
        <EditArticleControls
          onSubmit={this.handleSubmit}
          {...loadedArticle}
          article={loadedArticle}
          update
          success={success}
        />
      </Container>);
  }
}


EditArticle.propTypes = {
  loadedArticle: propTypes.objectOf(propTypes.any),
  updateArticle: propTypes.func,
  loadArticle: propTypes.func,
  match: propTypes.objectOf(propTypes.object),
  storeState: propTypes.shape({
    editing: propTypes.bool,
    isLoading: propTypes.bool,
    success: propTypes.bool,
    article: propTypes.object,
    errors: propTypes.shape({
      description: propTypes.arrayOf(propTypes.string),
      title: propTypes.arrayOf(propTypes.string),
    }),
  })
};

EditArticle.defaultProps = {
  loadedArticle: {},
  updateArticle: () => {},
  loadArticle: () => {},
  match: { params: { slug: '' } },
  storeState: {},
};

export const mapDispatchToProps = dispatch => ({
  updateArticle:
    (article, slug) => dispatch(updateArticleAction(article, slug)),
  loadArticle: slug => dispatch(loadArticleAction(slug)),
});

export const mapStateToProps = state => ({
  success: state.updateArticleReducer.success,
  loadedArticle: state.loadArticleReducer.article,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditArticle);
