import React, { Component } from 'react';
import { Container, Header, Image } from 'semantic-ui-react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Parser as HtmlToReactParser } from 'html-to-react';
import loadAricleAction from '../actions/loadArticleAction';
import '../../public/styles/SmartEditor.scss';
import TagView from './TagView';


const htmlToReactParser = new HtmlToReactParser();
/**
 *This component is used to display the article that was
 retrived from the database
 */
export class ArticleView extends Component {
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
   * Adds content of the article to the DOM using information
   * from the article that was retrieved from the database.
   *@returns {JSX} to be rendered to the DOM
   */
  render() {
    const { article } = this.props;

    const imageSrc = article.image
    || 'https://image.flaticon.com/icons/svg/254/254030.svg';

    const ReactElement = htmlToReactParser
      .parse(unescape(article.body));
    return (
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
          fluid
          size="huge"
          src={imageSrc}
        />
        <Container className="articleView">
          { ReactElement}
        </Container>
        <TagView
          tagNames={article.tags}
        />
      </Container>

    );
  }
}


ArticleView.propTypes = {
  article: propTypes.objectOf(propTypes.string),
  loadArticle: propTypes.func,
  slug: propTypes.string.isRequired
};

ArticleView.defaultProps = {
  article: { author: {} },
  loadArticle: () => {}
};

export const mapStateToProps = state => ({
  article: state.loadArticleReducer.article,
});

export const mapDispatchToProps = dispatch => ({
  loadArticle: slug => dispatch(loadAricleAction(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView);
