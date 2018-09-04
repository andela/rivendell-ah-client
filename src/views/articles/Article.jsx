import React from 'react';
import propTypes from 'prop-types';
import ArticleView from '../../components/ArticleView';

const Article = (props) => {
  const { match: { params } } = props;

  return (
    <ArticleView slug={params.slug} />
  );
};

Article.propTypes = {
  match: propTypes.objectOf(propTypes.object),
};

Article.defaultProps = {
  match: { params: { slug: '' } }
};

export default Article;
