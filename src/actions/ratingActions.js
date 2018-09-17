import types from './actionTypes';
import axiosInstance from '../services/requestHandler';

const { RATE_ARTICLE, ARTICLE_RATINGS } = types;

export const articleRatingsAction = articleSlug => ({
  type: ARTICLE_RATINGS,
  payload: axiosInstance().get(`/articles/${articleSlug}/rating`),
});

export const rateArtcleAction = (articleSlug, rating, isFirstRating) => {
  const axiosCall = !isFirstRating ? axiosInstance().put : axiosInstance().post;
  return {
    type: RATE_ARTICLE,
    payload: axiosCall(`/articles/${articleSlug}/rating`, { rating }),
  };
};
