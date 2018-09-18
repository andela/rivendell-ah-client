import types from './actionTypes';
import axiosInstance from '../services/requestHandler';


const storeLikes = article => ({
  type: types.STORE_LIKES,
  payload: {
    likes: article.likes,
    likesCount: article.likesCount
  },
});

const likeArticle = (slug, token) => ({
  type: types.LIKE_ARTICLE,
  payload: axiosInstance().post(`/articles/${slug}/like`, {},
    { headers: { Authorization: `${token}` } })
});

const unlikeArticle = (slug, token) => ({
  type: types.UNLIKE_ARTICLE,
  payload: axiosInstance().delete(`/articles/${slug}/like`,
    { headers: { Authorization: `${token}` } })
});
export default {
  likeArticle,
  storeLikes,
  unlikeArticle
};
