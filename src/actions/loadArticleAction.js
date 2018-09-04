import axiosInstance from '../services/requestHandler';
import types from './actionTypes';

const loadArticleAction = slug => ({
  type: types.LOAD_ARTICLE,
  payload: axiosInstance().get(`/articles/${slug}`),

});
export default loadArticleAction;
