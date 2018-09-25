import React, { Component } from 'react';
import { Container, Header, Image, Button } from 'semantic-ui-react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Parser as HtmlToReactParser } from 'html-to-react';
import { Redirect } from 'react-router';
import loadAricleAction from '../actions/loadArticleAction';
import TagView from './TagView';
import deleteArticleAction from '../actions/deleteArticle';
import Like from './Like';
import SocialShare from './SocialShare';

const htmlToReactParser = new HtmlToReactParser();
/**
 *This component is used to display the article that was
 retrived from the database
 */
export class ArticleView extends Component {
  /**
   * creates a new instance of an ArticleView component and returns
   * @param {object} props contains the props passed by its parents
   */
  constructor(props) {
    super(props);

    this.state = {
      showEditPage: false
    };

    this.deleteArticle = this.deleteArticle.bind(this);

    this.articleURL = encodeURIComponent(window.location.href);


    this.showUpdatePage = this.showUpdatePage.bind(this);
  }


  /**
   *
   * this method dispatches an action to delete an article
   * @returns {void} dispactches the delete article action and
   * returns nothing
   */
  deleteArticle() {
    const { deleteArticle, article } = this.props;
    deleteArticle(article);
  }

  /**
   * loads the article  by sending a request to the API to
   * once the component has been mounted to the DOM
   *@returns {void} performs an action and returns nothing
   */
  componentDidMount() {
    const { loadArticle, slug } = this.props;
    loadArticle(slug);
  }

  /**
   *@returns {void} performs an action and returns void
   */
  showUpdatePage() {
    this.setState({ showEditPage: true });
  }

  /**
   * Adds content of the article to the DOM using information
   * from the article that was retrieved from the database.
   *@returns {JSX} to be rendered to the DOM
   */
  render() {
    const { article, errors,
      currentUsername, deleted,
      likeProps
    } = this.props;
    const { showEditPage } = this.state;

    if (deleted) {
      return (
        <Redirect to="/" />
      );
    }
    if (showEditPage) {
      return (
        <Redirect to={`/articles/${article.slug}/edit`} />
      );
    }

    if (errors.status === 404) {
      return (
        <Redirect to="/not-found" />
      );
    }
    const ReactElement = htmlToReactParser
      .parse(unescape(article.body));
    return (
      <div id="article-page">
        <Container id="articleView">

          <Header size="huge" textAlign="center">

            <h1 className="header">{article.title}</h1>
            <Header.Subheader className="sub-header">
            Created By: @
              {article.author ? article.author.username : ''}
              {'  '}
            on
              {'  '}
              {new Date(article.createdAt).toUTCString()}
            </Header.Subheader>
          </Header>

          <Image
            centered
            size="huge"
            src={article.image}
            hidden={!article.image}
          />
          <Container className="articleView">
            { ReactElement}
          </Container>
          <Like {...likeProps} />
          {(article.author && article.author.username === currentUsername) ? (
            <span className="button-group">
              <Button
                as="button"
                content="Update Article"
                onClick={this.showUpdatePage}
              />

              <Button
                as="button"
                negative
                content="Delete Article"
                onClick={this.deleteArticle}
              />
            </span>

          ) : ''}
          <TagView
            tagNames={article.tags}
          />
          <SocialShare articleURL={this.articleURL} />
        </Container>

      </div>

    );
  }
}


ArticleView.propTypes = {
  article: propTypes.objectOf(propTypes.oneOfType([
    propTypes.string,
    propTypes.objectOf(propTypes.string),
    propTypes.arrayOf(propTypes.string)
  ])),
  loadArticle: propTypes.func,
  deleteArticle: propTypes.func,
  slug: propTypes.string.isRequired,
  errors: propTypes.objectOf(propTypes.any),
  currentUsername: propTypes.string,
  deleted: propTypes.bool,
  likeProps: propTypes.objectOf(propTypes.any),
};

ArticleView.defaultProps = {
  article: { author: {} },
  loadArticle: () => {},
  errors: {},
  currentUsername: '',
  deleteArticle: () => {},
  deleted: false,
  likeProps: {},
};

export const mapStateToProps = state => ({
  article: state.loadArticleReducer.article,
  errors: state.loadArticleReducer.errors,
  deleted: state.deleteArticleReducer.success,
  currentUsername: state.profile.userProfile.username
});

export const mapDispatchToProps = dispatch => ({
  loadArticle: slug => dispatch(loadAricleAction(slug)),
  deleteArticle: article => dispatch(deleteArticleAction(article))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView);
