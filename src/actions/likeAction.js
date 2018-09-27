import types from './actionTypes';
import axiosInstance from '../services/requestHandler';


const getLikes = slug => ({
  type: types.GET_LIKES,
  payload: axiosInstance().get(`/articles/${slug}/like`)
});

const likeArticle = (slug, token) => ({
  type: types.LIKE_ARTICLE,
  payload: axiosInstance().post(
    `/articles/${slug}/like`, {},
    { headers: { Authorization: `${token}` } }
  )
});

const unlikeArticle = (slug, token) => ({
  type: types.UNLIKE_ARTICLE,
  payload: {
    slug,
    token,
  }
});
export default {
  likeArticle,
  getLikes,
  unlikeArticle
};
