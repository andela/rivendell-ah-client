import types from '../actions/actionTypes';

const {
  GET_ARTICLES, UPDATE_ACTIVE_PAGE, GET_CATEGORIES,
  GET_TOP_RATED, GET_FEED, GET_FAVORITE_ARTICLES,
  DISPLAY_NEXT_FAVORITE_ARTICLE,
} = types;

export const initialArticlesState = {
  isLoading: false,
  errors: {
    statusCode: 0,
    message: '',
    response: {},
  },
  limit: 4,
  activePage: 1,
  articlesCount: 0,
  featuredArticles: {},
};

export const initialFeedState = {
  isLoading: false,
  errors: {
    statusCode: 0,
    message: '',
    response: {},
  },
  limit: 4,
  activePage: 1,
  articlesCount: 0,
  feedArticles: {},
};


export const initialCategoriesState = {
  isLoading: false,
  errors: {
    statusCode: 0,
    message: '',
    response: {},
  },
  categories: [],
};

export const initialTopRatedState = {
  isLoading: false,
  errors: {
    statusCode: 0,
    message: '',
    response: {},
  },
  topRatedArticles: [],
};

export const initFavArticleState = {
  isLoading: false,
  errors: {
    statusCode: 0,
    message: '',
    response: {},
  },
  favoriteArticles: [],
  nextArticle: {}
};

export const featuredArticles = (state = initialArticlesState, action = {}) => {
  switch (action.type) {
  case UPDATE_ACTIVE_PAGE:
    return {
      ...state,
      activePage: action.payload
    };
  case `${GET_ARTICLES}_LOADING`:
    return {
      ...state,
      isLoading: true
    };
  case `${GET_ARTICLES}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        statusCode: action.payload.statusCode,
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  case `${GET_ARTICLES}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      articlesCount: action.payload.data.articlesCount,
      featuredArticles: {
        ...state.featuredArticles,
        [action.payload.activePage]: action.payload.data.articles
      },
      activePage: action.payload.activePage
    };
  default:
    return state;
  }
};

export const feed = (state = initialFeedState, action = {}) => {
  switch (action.type) {
  case UPDATE_ACTIVE_PAGE:
    return {
      ...state,
      activePage: action.payload
    };
  case `${GET_FEED}_LOADING`:
    return {
      ...state,
      isLoading: true
    };
  case `${GET_FEED}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        statusCode: action.payload.statusCode,
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  case `${GET_FEED}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      articlesCount: action.payload.data.articlesCount,
      feedArticles: {
        ...state.feedArticles,
        [action.payload.activePage]: action.payload.data.feed
      },
      activePage: action.payload.activePage
    };
  default:
    return state;
  }
};


export const categories = (state = initialCategoriesState, action = {}) => {
  switch (action.type) {
  case `${GET_CATEGORIES}_LOADING`:
    return {
      ...state,
      isLoading: true
    };
  case `${GET_CATEGORIES}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        statusCode: action.payload.statusCode,
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  case `${GET_CATEGORIES}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      categories: action.payload.data.categories.reverse()
    };
  default:
    return state;
  }
};

export const topRated = (state = initialTopRatedState, action = {}) => {
  switch (action.type) {
  case `${GET_TOP_RATED}_LOADING`:
    return {
      ...state,
      isLoading: true
    };
  case `${GET_TOP_RATED}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        statusCode: action.payload.statusCode,
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  case `${GET_TOP_RATED}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      topRatedArticles: action.payload.data.topRated,
    };
  default:
    return state;
  }
};

export const favoriteArticles = (state = initFavArticleState, action = {}) => {
  switch (action.type) {
  case DISPLAY_NEXT_FAVORITE_ARTICLE:
    return {
      ...state,
      nextArticle: action.payload,
    };
  case `${GET_FAVORITE_ARTICLES}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${GET_FAVORITE_ARTICLES}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        statusCode: action.payload.statusCode,
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  case `${GET_FAVORITE_ARTICLES}_SUCCESS`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      favoriteArticles: action.payload.data.favoriteArticles,
    };
  default:
    return state;
  }
};

export default {};
