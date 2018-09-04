
import axiosInstance from '../services/requestHandler';
import types from './actionTypes';

const createArticle = article => ({
  type: types.CREATE_ARTICLE,
  payload: axiosInstance()
    .post('/articles',
      { article, }),
});

export default createArticle;
