import types from './actionTypes';
import axiosInstance from '../services/requestHandler';

const {
  GET_ARTICLES, UPDATE_ACTIVE_PAGE, GET_CATEGORIES,
  GET_TOP_RATED, GET_FEED, GET_FAVORITE_ARTICLES,
  DISPLAY_NEXT_FAVORITE_ARTICLE,
} = types;

const getArticles = (limit, activePage) => ({
  type: GET_ARTICLES,
  payload: {
    limit,
    activePage,
  }
});

const updateActivePage = activePage => ({
  type: UPDATE_ACTIVE_PAGE,
  payload: activePage
});

const getCategories = () => ({
  type: GET_CATEGORIES,
  payload: axiosInstance().get('/categories')
});

const getTopRated = () => ({
  type: GET_TOP_RATED,
  payload: axiosInstance().get('/articles/top-rated')
});

const getFeed = (limit, activePage) => ({
  type: GET_FEED,
  payload: {
    limit,
    activePage,
  }
});

const getFavoriteArticles = () => ({
  type: GET_FAVORITE_ARTICLES,
  payload: axiosInstance().get('/articles/favorites'),
});

const displayNextFavoriteArticle = displayObj => ({
  type: DISPLAY_NEXT_FAVORITE_ARTICLE,
  payload: displayObj,
});

export default {
  getArticles,
  updateActivePage,
  getCategories,
  getTopRated,
  getFeed,
  getFavoriteArticles,
  displayNextFavoriteArticle,
};
