import axiosInstance from '../services/requestHandler';
import types from './actionTypes';

const getArticlesByTags = tag => ({
  type: types.GET_ARTICLES_BY_TAGS,
  payload: axiosInstance().get(`/articles?tag=${tag}`)
});

export default getArticlesByTags;
