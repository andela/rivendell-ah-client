import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Item, Label } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import getArticlesByTags from '../../actions/tagAction';
import ListArticlesByTag from './ListArticlesByTag';

/**
 * ArticleTags
 * @returns {Null} jsx
 *
 */
export class ArticleTags extends React.Component {
  /**
   * constructor function
   * @param {Object} props props object
   */
  constructor() {
    super();
    this.state = {};
  }

  /**
   * component did mount
   * @returns {null} null
   */
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { tag } = match.params;
    dispatch(getArticlesByTags(tag));
  }

  /**
   * @returns {Function} jsx
   */
  render() {
    const { articles } = this.props;
    const content = articles.map((article, index) => (
      <Item key={index}>
        <Item.Image
          src={article.image
          || 'https://react.semantic-ui.com/images/wireframe/image.png'}
        />

        <Item.Content>
          <Item.Header as="a">{article.title}</Item.Header>
          <Item.Meta>
            <span className="cinema">{article.description}</span>
          </Item.Meta>
          <Item.Description>
            {`${article.body.slice(0, 150)}...`}
          </Item.Description>
          <Link to={`/article/${article.slug}`}>
            <Button className="read-more" content="Read more..." />
          </Link>
          <Item.Extra>
            {article.tags.map(tag => (
              <Link to={`/article-tags/${tag}`}><Label>{tag}</Label></Link>
            ))}
          </Item.Extra>
        </Item.Content>
      </Item>
    ));
    return (
      <div className="central">
        <ListArticlesByTag content={content} />
        {/* <pre>{JSON.stringify(articles, null, 2)}</pre> */}
      </div>
    );
  }
}

ArticleTags.propTypes = {
  dispatch: PropTypes.bool.isRequired,
  match: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  articles: PropTypes.shape({}).isRequired,
};

export const mapStateToProps = (state) => {
  const { errors, articles, isLoading } = state.articlesByTags;
  return {
    errors,
    articles,
    isLoading
  };
};

export default connect(mapStateToProps)(ArticleTags);
