import types from './actionTypes';
import axiosInstance from '../services/requestHandler';

const getArticle = slug => ({
  type: types.GET_ARTICLE,
  payload: axiosInstance().get(`/articles/${slug}`)
});

export default {
  getArticle,
};
