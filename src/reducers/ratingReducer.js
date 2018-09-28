import types from '../actions/actionTypes';
import { myRating } from '../helpers/ratingHelper';

const { ARTICLE_RATINGS, RATE_ARTICLE } = types;

export const initialState = {
  isLoading: false,
  success: {
    status: false,
    rating: {
      averageRating: 0,
      raters: 0,
      myRating: 0,
      ratersInfo: [],
    },
  },
  error: {
    status: false,
    statusCode: 0,
    message: '',
  },
};

export const articleRatings = (state = initialState, action = {}) => {
  switch (action.type) {
  case `${ARTICLE_RATINGS}_LOADING`:
    return {
      isLoading: true,
      success: {
        status: false,
        rating: {
          averageRating: 0,
          raters: 0,
          ratersInfo: [],
          myRating: 0,
        },
      },
      error: { status: false, message: '' },
    };

  case `${ARTICLE_RATINGS}_SUCCESS`:
    return {
      isLoading: false,
      success: {
        status: true,
        rating: {
          averageRating: +action.payload.data.ratingDetails.averageRating || 0,
          raters: +action.payload.data.ratings.length || 0,
          ratersInfo: myRating(
            action.payload.data.ratings,
            localStorage.getItem('userId')
          ).ratersInfo || [],
          myRating: +myRating(
            action.payload.data.ratings,
            localStorage.getItem('userId')
          ).myRate || 0,
        },
      },
      error: { status: false },
    };

  case `${ARTICLE_RATINGS}_FAILURE`:
    return {
      isLoading: false,
      success: {
        status: false,
        rating: {
          averageRating: 0,
          raters: 0,
          ratersInfo: [],
          myRating: 0,
        },
      },
      error: {
        status: true,
        statusCode: action.payload.statusCode || 0,
        message: action.payload.message || '',
      },
    };

  default:
    return state;
  }
};


export const rateArticleState = {
  isLoading: false,
  isRated: false,
  message: '',
};

export const rateArticle = (state = rateArticleState, action = {}) => {
  switch (action.type) {
  case `${RATE_ARTICLE}_LOADING`:
    return {
      ...state,
      isLoading: true,
      isRated: false,
      message: '',
    };

  case `${RATE_ARTICLE}_SUCCESS`:
    return {
      isLoading: false,
      isRated: true,
      message: '',
    };

  case `${RATE_ARTICLE}_FAILURE`:
    return {
      isLoading: false,
      isRated: false,
      message: action.payload,
    };

  default:
    return state;
  }
};

const ratings = {
  rateArticle,
  articleRatings,
};

export default ratings;
