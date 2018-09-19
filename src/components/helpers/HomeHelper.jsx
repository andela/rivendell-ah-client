import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Pagination, Button } from 'semantic-ui-react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

export const ArticleWithImg = ({
  article, backgroundImage, slideDown, slideUp,
  articleImgStyles, articleDescription,
}) => (
  <Link to={`/articles/${article.slug}`}>
    <div
      id="article-with-img"
      style={{
        width: '100%',
        backgroundImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onMouseEnter={() => { slideUp(article.slug); }}
      onMouseLeave={() => { slideDown(article.slug); }}
    >
      <div
        className="img-content"
        style={{ ...articleImgStyles[article.slug] }}
      >
        <div className="title-container">
          <h4 className="title">{article.title}</h4>
        </div>
        <p className="desc">{articleDescription}</p>
        <p className="author">{article.author.username}</p>
        <p className="date">
          {new Date(article.createdAt).toDateString()}
        </p>
      </div>
    </div>
  </Link>
);

ArticleWithImg.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  backgroundImage: PropTypes.string.isRequired,
  articleDescription: PropTypes.string.isRequired,
  slideDown: PropTypes.func.isRequired,
  slideUp: PropTypes.func.isRequired,
  articleImgStyles: PropTypes.shape({
  }).isRequired
};

export const Articles = ({
  articles, slideDown, slideUp, articleImgStyles
}) => (
  articles
    .map((article) => {
      const backgroundImageUrl = article.image
        || 'https://react.semantic-ui.com/images/wireframe/image.png';
      const backgroundImage = `url(${backgroundImageUrl})`;
      let articleDescription = article.description;
      if (articleDescription.length > 100) {
        articleDescription = `${article.description.substring(0, 100)}...`;
      }
      return (
        <li key={article.slug}>
          <ArticleWithImg
            article={article}
            backgroundImage={backgroundImage}
            articleDescription={articleDescription}
            slideDown={slideDown}
            slideUp={slideUp}
            articleImgStyles={articleImgStyles}
          />
        </li>
      );
    })
);

Articles.propTypes = {
  articles: PropTypes
    .arrayOf(PropTypes.shape({
      title: PropTypes.string
    })).isRequired,
  slideDown: PropTypes.func.isRequired,
  slideUp: PropTypes.func.isRequired,
  articleImgStyles: PropTypes.shape({
  }).isRequired
};

export const CategoriesMenu = ({ categories, subcategoryClick }) => (
  <ul className="category-menu">
    {
      categories
        .map((category, index) => (
          <li key={index}>
            <ButtonToolbar>
              <DropdownButton
                bsStyle="link"
                title={category.name}
                noCaret
                id="dropdown-no-caret"
              >
                {
                  category.subcategories
                    .map(subcategory => (
                      <MenuItem
                        key={subcategory.id}
                        eventKey={subcategory.id}
                        // href={`/${subcategory.name}`}
                        onClick={() => subcategoryClick(subcategory.name)}
                      >
                        {subcategory.name}
                      </MenuItem>
                    ))
                }
              </DropdownButton>
            </ButtonToolbar>
          </li>
        ))
    }
  </ul>
);

CategoriesMenu.propTypes = {
  categories: PropTypes
    .arrayOf(PropTypes.shape({
      id: PropTypes.string
    })).isRequired,
  subcategoryClick: PropTypes.func.isRequired,
};

export const FavoriteArticleImg = ({ favoriteArticle }) => (
  <div
    id="article-with-img"
    style={{
      backgroundImage: (() => {
        const imgUrl = favoriteArticle.article.image
      || 'https://react.semantic-ui.com/images/wireframe/image.png';
        return `url(${imgUrl})`;
      })(),
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  />
);

FavoriteArticleImg.propTypes = {
  favoriteArticle: PropTypes.shape({
    article: PropTypes.shape({
      image: PropTypes.string
    })
  }),
};

FavoriteArticleImg.defaultProps = {
  favoriteArticle: {}
};

export const FavoriteArticles = ({
  favoriteArticles, nextArticle, getNextArticle
}) => (
  favoriteArticles[0] ? (
    <div className="favorite-articles-container">
      <h3>Favorite articles</h3>
      <ul>
        {
          favoriteArticles
            .map((favoriteArticle, i, arr) => (
              <li
                className="favorite-article"
                key={favoriteArticle.id}
                style={{ ...nextArticle[i] }}
              >
                <FavoriteArticleImg
                  favoriteArticle={favoriteArticle}
                />
                <div className="article-content">
                  <Link to={`/articles/${favoriteArticle.article.slug}`}>
                    <h4 className="title">
                      {favoriteArticle.article.title}
                    </h4>
                    <p className="desc">
                      {favoriteArticle.article.description}
                    </p>
                    <p className="author">
                      {favoriteArticle.article.author.username}
                    </p>
                    <p className="date">
                      {new Date(favoriteArticle.article.createdAt)
                        .toDateString()}
                    </p>
                  </Link>
                </div>
                <Button
                  className="next-article"
                  onClick={() => getNextArticle(i, arr)}
                >
                  Next article
                </Button>
              </li>
            ))
        }
      </ul>
    </div>
  ) : null
);

FavoriteArticles.propTypes = {
  favoriteArticles: PropTypes
    .arrayOf(PropTypes.shape({
      slug: PropTypes.string
    })),
  nextArticle: PropTypes
    .objectOf(PropTypes.shape({
      display: PropTypes.string
    })),
  getNextArticle: PropTypes.func.isRequired,
};

FavoriteArticles.defaultProps = {
  favoriteArticles: [],
  nextArticle: {},
};

export const Banner = () => (
  <div className="hero">
    <div className="text container">
      <h1>AUTHORS HAVEN,</h1>
      <h1>A WHOLE NEW WORLD</h1>
      <Link to="/signup">
        <Button>Get started</Button>
      </Link>
    </div>
    <div className="hero-overlay">{}</div>
  </div>
);

export const TopRated = ({ topRatedArticles }) => (
  <div className="top-rated">
    <h3>Top rated</h3>
    <ul>
      {
        topRatedArticles
          .map(article => (
            <li key={article.slug}>
              <Link to={`/articles/${article.slug}`}>
                <span><i className="material-icons">star</i></span>
                <div className="article-content">
                  <h4 className="title">{article.title}</h4>
                  <p className="desc">{article.description}</p>
                  <p className="author">{article.authorUsername}</p>
                  <p className="date">
                    {new Date(article.createdAt).toDateString()}
                  </p>
                </div>
              </Link>
            </li>
          ))
      }
    </ul>
  </div>
);

TopRated.propTypes = {
  topRatedArticles: PropTypes
    .arrayOf(PropTypes.shape({
      slug: PropTypes.string
    })),
};

TopRated.defaultProps = {
  topRatedArticles: []
};

export const PaginatedArticles = ({
  token, displayArticles, articleImgStyles, slideDown, slideUp,
  feedActivePage, featArticlesActivePage, handlePaginationChange,
  feedPageCount, feetArticlesPageCount
}) => (
  <div className="articles">
    <h3>{token ? 'Feed' : 'Featured articles'}</h3>
    <ul>
      <Articles
        articles={displayArticles}
        articleImgStyles={articleImgStyles}
        slideDown={slideDown}
        slideUp={slideUp}
      />
    </ul>
    <div id="pagination-container">
      <Pagination
        className="pagination"
        activePage={
          token ? feedActivePage : featArticlesActivePage
        }
        onPageChange={handlePaginationChange}
        totalPages={token ? feedPageCount : feetArticlesPageCount}
      />
    </div>
  </div>
);

PaginatedArticles.propTypes = {
  featArticlesActivePage: PropTypes.number.isRequired,
  feetArticlesPageCount: PropTypes.number.isRequired,
  feedPageCount: PropTypes.number.isRequired,
  feedActivePage: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  displayArticles: PropTypes
    .arrayOf(PropTypes.shape({
      slug: PropTypes.string
    })),
  articleImgStyles: PropTypes.shape({}),
  slideDown: PropTypes.func.isRequired,
  slideUp: PropTypes.func.isRequired,
  handlePaginationChange: PropTypes.func.isRequired,
};

PaginatedArticles.defaultProps = {
  displayArticles: {},
  articleImgStyles: {},
};

export default {};
