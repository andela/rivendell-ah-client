import types from './actionTypes';
import axiosInstance from '../services/requestHandler';

const getArticle = slug => ({
  type: types.GET_ARTICLE,
  payload: axiosInstance().get(`/articles/${slug}`)
});

export const reportArticleAction = (slug, type, description) => ({
  type: types.REPORT_ARTICLE,
  payload: axiosInstance()
    .post(
      `/articles/${slug}/report`,
      {
        report: { type, description }
      }
    )

});

export default {
  getArticle,
  reportArticleAction,
};
