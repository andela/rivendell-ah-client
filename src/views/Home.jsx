import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Container } from 'semantic-ui-react';
import articlesAction from '../actions/articlesAction';
import {
  CategoriesMenu, FavoriteArticles, Banner, TopRated, PaginatedArticles
} from '../components/helpers/HomeHelper';

/**
 * Home component
 */
export class Home extends React.Component {
  /**
   * @returns {null} null
   */
  constructor() {
    super();
    this.state = {
      articleImgStyles: {},
    };
    this.slideUp = this.slideUp.bind(this);
    this.slideDown = this.slideDown.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.getNextArticle = this.getNextArticle.bind(this);
  }

  /**
   * @returns {null} null
   */
  componentDidMount() {
    const {
      getArticles, featArticlesLimit,
      featArticlesActivePage, featuredArticles, getFeed,
      categories, getCategories, getTopRated, topRatedArticles,
      feedActivePage, feedLimit, token, feedArticles, getFavoriteArticles,
      favoriteArticles,
    } = this.props;
    if (token && !Object.keys(feedArticles).length) {
      getFeed(feedLimit, feedActivePage);
    }
    if (token && !favoriteArticles.length) getFavoriteArticles();
    if (!token && !Object.keys(featuredArticles).length) {
      getArticles(featArticlesLimit, featArticlesActivePage);
    }
    if (!categories.length) getCategories();
    if (!topRatedArticles.length) getTopRated();
  }

  /**
   * swtich to the next article
   * @param {Number} key like id
   * @param {Array} arr array of featuredArticles
   * @returns {null} null
   */
  getNextArticle(key, arr) {
    const { displayNextFavoriteArticle } = this.props;
    const favoriteArticlesDisplays = {};
    favoriteArticlesDisplays[key] = {
      transition: 'opacity 0.5s ease-in-out',
      display: 'none',
    };
    let nextArticleIndex = key + 1;
    if (nextArticleIndex > arr.length) {
      nextArticleIndex -= nextArticleIndex;
    }
    let display = 'flex';
    if (window.innerWidth < 768) display = 'block';
    favoriteArticlesDisplays[nextArticleIndex] = {
      display,
    };
    displayNextFavoriteArticle(favoriteArticlesDisplays);
  }

  /**
   * slide in side menu
   * @param {String} key key
   * @returns {null} null
   */
  slideUp(key) {
    if (window.innerWidth >= 768) {
      this.setState(state => ({
        articleImgStyles: {
          [key]: {
            ...state.articleImgStyles.key,
            animation: 'slide-up 0.3s',
            bottom: '0px'
          }
        }
      }));
    }
  }

  /**
   * slide in side menu
   * @param {String} key key
   * @returns {null} null
   */
  slideDown(key) {
    if (window.innerWidth >= 768) {
      this.setState(state => ({
        articleImgStyles: {
          [key]: {
            ...state.articleImgStyles.key,
            animation: 'slide-down 0.3s',
          }
        }
      }));
    }
  }

  /**
   * handle pagination change
   * @param {Object} e event object
   * @returns {null} null
   */
  handlePaginationChange(e, { activePage }) {
    this.setState({
      articleImgStyles: {
        animation: '',
        bottom: '',
        top: '',
      }
    });
    const {
      feetArticlesPageCount, featuredArticles, featArticlesLimit,
      updateActivePage, getArticles,
      feedLimit, feedArticles, feedPageCount, token, getFeed,
    } = this.props;
    if (token) {
      const page = activePage < feedPageCount ? activePage : feedPageCount;
      if (feedArticles[page]) {
        return updateActivePage(page);
      }
      return getFeed(feedLimit, page);
    }
    const page = activePage < feetArticlesPageCount
      ? activePage : feetArticlesPageCount;
    if (featuredArticles[page]) {
      return updateActivePage(page);
    }
    getArticles(featArticlesLimit, page);
  }

  /**
   * navigate to clicked subcategory
   * @param {String} subcategory subcategory
   * @returns {null} null
   */
  subcategoryClick = (subcategory) => {
    const { history } = this.props;
    history.push(`/${subcategory}`);
  }

  /**
   * render method
   * @returns {Object} virtual dom
   */
  render() {
    const { articleImgStyles } = this.state;
    const {
      feetArticlesPageCount, featArticlesActivePage, featuredArticles,
      categories, topRatedArticles,
      feedPageCount, feedActivePage, feedArticles, token, favoriteArticles,
      nextArticle,
    } = this.props;
    let displayArticles = [];
    if (token && Object.keys(feedArticles).length) {
      displayArticles = feedArticles[feedActivePage];
    }
    if (!token && Object.keys(featuredArticles).length) {
      displayArticles = featuredArticles[featArticlesActivePage];
    }
    return (
      <div id="home">
        <Container>
          <CategoriesMenu
            categories={categories}
            subcategoryClick={this.subcategoryClick}
          />
          { token
            ? (
              <FavoriteArticles
                nextArticle={nextArticle}
                favoriteArticles={favoriteArticles}
                getNextArticle={this.getNextArticle}
              />
            )
            : <Banner />
          }
          <div className="body-content">
            <TopRated topRatedArticles={topRatedArticles} />
            <PaginatedArticles
              token={token}
              displayArticles={displayArticles}
              articleImgStyles={articleImgStyles}
              slideDown={this.slideDown}
              slideUp={this.slideUp}
              feedActivePage={feedActivePage}
              featArticlesActivePage={featArticlesActivePage}
              handlePaginationChange={this.handlePaginationChange}
              feedPageCount={feedPageCount}
              feetArticlesPageCount={feetArticlesPageCount}
            />
          </div>
        </Container>
      </div>
    );
  }
}

Home.propTypes = {
  getArticles: PropTypes.func.isRequired,
  updateActivePage: PropTypes.func.isRequired,
  featArticlesLimit: PropTypes.number.isRequired,
  featArticlesActivePage: PropTypes.number.isRequired,
  feetArticlesPageCount: PropTypes.number.isRequired,
  feedPageCount: PropTypes.number.isRequired,
  feedActivePage: PropTypes.number.isRequired,
  feedLimit: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  feedArticles: PropTypes
    .objectOf(PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string
      })
    )),
  nextArticle: PropTypes
    .objectOf(PropTypes.shape({
      display: PropTypes.string
    })),
  featuredArticles: PropTypes
    .objectOf(PropTypes.arrayOf(PropTypes.shape({
      slug: PropTypes.string
    }))),
  topRatedArticles: PropTypes
    .arrayOf(PropTypes.shape({
      slug: PropTypes.string
    })),
  favoriteArticles: PropTypes
    .arrayOf(PropTypes.shape({
      slug: PropTypes.string
    })),
  categories: PropTypes
    .arrayOf(PropTypes.shape({
      name: PropTypes.string
    })).isRequired,
  getCategories: PropTypes.func.isRequired,
  getTopRated: PropTypes.func.isRequired,
  getFeed: PropTypes.func.isRequired,
  getFavoriteArticles: PropTypes.func.isRequired,
  displayNextFavoriteArticle: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
};

Home.defaultProps = {
  featuredArticles: {},
  topRatedArticles: [],
  feedArticles: {},
  favoriteArticles: [],
  nextArticle: {},
};

export const mapStateToProps = (state) => {
  const {
    errors: featArticlesErrors, limit: featArticlesLimit,
    activePage: featArticlesActivePage,
    articlesCount: featArticlesCount, articles: featuredArticles,
    isLoading: featArticlesIsLoading,
  } = state.articles;
  const {
    errors: feedErrors, limit: feedLimit,
    activePage: feedActivePage,
    feedArticles, isLoading: feedIsLoading, articlesCount: feedArticlesCount,
  } = state.feed;
  const { categories } = state.categories;
  const { topRatedArticles } = state.topRated;
  const { favoriteArticles, nextArticle } = state.favoriteArticles;
  const { token } = state.auth;
  return {
    featArticlesErrors,
    featArticlesLimit,
    featArticlesActivePage,
    feetArticlesPageCount: Math.ceil(featArticlesCount / featArticlesLimit),
    featArticlesCount,
    featuredArticles,
    featArticlesIsLoading,
    categories,
    topRatedArticles,
    feedErrors,
    feedLimit,
    feedActivePage,
    feedArticles,
    feedIsLoading,
    feedPageCount: Math.ceil(feedArticlesCount / feedLimit),
    favoriteArticles,
    token,
    nextArticle,
  };
};

export default connect(mapStateToProps, {
  getArticles: articlesAction.getArticles,
  updateActivePage: articlesAction.updateActivePage,
  getCategories: articlesAction.getCategories,
  getTopRated: articlesAction.getTopRated,
  getFeed: articlesAction.getFeed,
  getFavoriteArticles: articlesAction.getFavoriteArticles,
  displayNextFavoriteArticle: articlesAction.displayNextFavoriteArticle
})(Home);
