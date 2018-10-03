import React, { Component } from 'react';
import { Container, Header, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Parser as HtmlToReactParser } from 'html-to-react';
import { Redirect } from 'react-router';
import readingTime from 'reading-time';
import ReportArticle from './ReportArticle';
import loadAricleAction from '../actions/loadArticleAction';
import TagView from './TagView';
import deleteArticleAction from '../actions/deleteArticle';
import Like from './Like';
import ArticleRating from '../views/articles/rating/ArticleRating';
import SocialShare from './SocialShare';
import { reportArticleAction } from '../actions/articleAction';

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
    this.sendArticleReport = this.sendArticleReport.bind(this);
    this.resetReport = this.resetReport.bind(this);
  }


  /**
   *
   * this method dispatches an action to delete an article
   * @returns {void} dispactches the delete article action and
   * returns nothing
   */
  deleteArticle() {
    const { deleteArticle, article, history } = this.props;
    deleteArticle(article);
    history.push('/');
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
   * @returns {void} resets the page to how it was initially
   */
  componentWillUnmount() {
    const { resetPage } = this.props;
    resetPage();
  }


  /**
   *@returns {void} performs an action and returns void
   */
  showUpdatePage() {
    this.setState({ showEditPage: true });
  }

  /**
   *this dispatches an action to report the article that is being viewed
   * @param {object} report contains the type and description of the report
   * @return {void} performs an action and returns nothing
   */
  sendArticleReport(report) {
    const { reportArticle, article } = this.props;
    reportArticle(article.slug, report.type, report.description);
  }


  /**
   *@returns {void} resets the store and returns nothing
   */
  resetReport() {
    const { resetReportStore } = this.props;
    resetReportStore();
  }

  /**
   * Adds content of the article to the DOM using information
   * from the article that was retrieved from the database.
   *@returns {JSX} to be rendered to the DOM
   */
  render() {
    const { article, errors,
      currentUsername, report,
      likeProps
    } = this.props;
    const { showEditPage } = this.state;
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
    const stats = readingTime(unescape(article.body));
    return (
      <div id="article-page">
        <Container id="articleView">

          <Header size="huge" textAlign="center">

            <h1 className="header">{article.title}</h1>
            <Header.Subheader className="sub-header">
              <div className="article-info-stats">
                <p>
               Created By: @
                  {article.author ? article.author.username : ''}
                  {'  '}
            on
                  {'  '}
                  {new Date(article.createdAt).toUTCString()}
                </p>


                <p>{stats.text}</p>
              </div>

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
          <ReportArticle
            onSubmit={this.sendArticleReport}
            errors={report.errors}
            success={report.success}
            onClose={this.resetReport}
          />
          {article.slug ? <ArticleRating articleSlug={article.slug} /> : ''}
          <SocialShare articleURL={this.articleURL} />
        </Container>

      </div>

    );
  }
}


ArticleView.propTypes = {
  article: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.string)
  ])),
  loadArticle: PropTypes.func,
  deleteArticle: PropTypes.func,
  slug: PropTypes.string.isRequired,
  errors: PropTypes.objectOf(PropTypes.any),
  currentUsername: PropTypes.string,
  deleted: PropTypes.bool,
  likeProps: PropTypes.objectOf(PropTypes.any),
  reportArticle: PropTypes.func,
};

ArticleView.defaultProps = {
  article: { author: {} },
  loadArticle: () => {},
  errors: {},
  currentUsername: '',
  deleteArticle: () => {},
  deleted: false,
  likeProps: {},
  reportArticle: () => {}
};

export const mapStateToProps = state => ({
  article: state.loadArticleReducer.article,
  errors: state.loadArticleReducer.errors,
  deleted: state.deleteArticleReducer.success,
  currentUsername: state.profile.userProfile.username,
  report: state.reportArticle
});

export const mapDispatchToProps = dispatch => ({
  loadArticle: slug => dispatch(loadAricleAction(slug)),
  deleteArticle: article => dispatch(deleteArticleAction(article)),
  resetReportStore: () => dispatch({ type: 'REPORT_ARTICLE_RESET' }),
  resetPage: () => dispatch({ type: 'DELETE_ARTICLE_RESET' }),
  reportArticle:
   (slug, type, description) => dispatch(
     reportArticleAction(slug, type, description)
   ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView);
