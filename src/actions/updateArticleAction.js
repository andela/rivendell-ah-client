import axiosInstance from '../services/requestHandler';

import types from './actionTypes';

const updateArticleAction = (article, slug) => ({
  type: types.UPDATE_ARTICLE,
  payload: axiosInstance()
    .put(
      `/articles/${slug}`,
      { article, }
    ),
});


export default updateArticleAction;
