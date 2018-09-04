
import axiosInstance from '../services/requestHandler';
import types from './actionTypes';

const deleteArticle = article => ({
  type: types.DELETE_ARTICLE,
  payload: axiosInstance()
    .delete(`/articles/${article.slug}`),
});

export default deleteArticle;
