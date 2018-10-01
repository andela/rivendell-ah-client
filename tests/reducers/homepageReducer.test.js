import {
  initialArticlesState, featuredArticles, favoriteArticles, initFavArticleState,
  initialTopRatedState, topRated, categories, initialCategoriesState, initialFeedState,
  feed,
} from '../../src/reducers/homepageReducer';
import actions from '../../src/actions/actionTypes';

describe('Testing articlesReducer', () => {
  describe('Testing articles', () => {
    it('should return the initial state if no action type is passed', () => {
      const state = featuredArticles(initialArticlesState);
      expect(state).toEqual(initialArticlesState);
    });
    it('should return the initial state if no initial state is passed', () => {
      const state = featuredArticles();
      expect(state).toEqual(initialArticlesState);
    });
    it('should return the initial state if no invalid action type is passed', () => {
      const state = featuredArticles(initialArticlesState, { type: 'INVALID' });
      expect(state).toEqual(initialArticlesState);
    });
    it('should update the active page when UPDATE_ACTIVE_PAGE is dispatched', () => {
      const action = {
        type: actions.UPDATE_ACTIVE_PAGE,
        payload: 'active page',
      }
      const state = featuredArticles(initialArticlesState, action);
      expect(state.activePage).toEqual(action.payload);
    });
    it('should store the articles, active page, and articles count', () => {
      const action = {
        type: `${actions.GET_ARTICLES}_SUCCESS`,
        payload: {
          activePage: 1,
          data: {
            articles: ['a', 'b'],
            articlesCount: 2,
          }
        }
      }
      const state = featuredArticles(initialArticlesState, action);
      expect(state.featuredArticles[1]).toEqual(action.payload.data.articles);
      expect(state.activePage).toEqual(action.payload.activePage);
      expect(state.articlesCount).toEqual(action.payload.data.articlesCount);
    });
    it('should save an error message on failure', () => {
      const action = {
        type: `${actions.GET_ARTICLES}_FAILURE`,
        payload: {
          message: 'ERROR!!'
        }
      }
      const state = featuredArticles(initialArticlesState, action);
      expect(state.errors.message).toEqual(action.payload.message);
    });
    it('should set isLoading to true on loading', () => {
      const action = { type: `${actions.GET_ARTICLES}_LOADING`};
      const state = featuredArticles(initialArticlesState, action);
      expect(state.isLoading).toEqual(true);
    });
  })
  describe('Testing favoriteArticles', () => {
    it('should return the initial state if no action type is passed', () => {
      const state = favoriteArticles(initFavArticleState);
      expect(state).toEqual(initFavArticleState);
    });
    it('should return the initial state if no initial state is passed', () => {
      const state = favoriteArticles();
      expect(state).toEqual(initFavArticleState);
    });
    it('should return the initial state if no invalid action type is passed', () => {
      const state = favoriteArticles(initFavArticleState, { type: 'INVALID' });
      expect(state).toEqual(initFavArticleState);
    });
    it('should should store the favorite articles on success', () => {
      const action = {
        type: `${actions.GET_FAVORITE_ARTICLES}_SUCCESS`,
        payload: {
          data: {
            favoriteArticles: ['a', 'b'],
          }
        }
      }
      const state = favoriteArticles(initFavArticleState, action);
      expect(state.favoriteArticles).toEqual(action.payload.data.favoriteArticles);
    });
    it('should save an error message on failure', () => {
      const action = {
        type: `${actions.GET_FAVORITE_ARTICLES}_FAILURE`,
        payload: {
          message: 'ERROR!!'
        }
      }
      const state = favoriteArticles(initFavArticleState, action);
      expect(state.errors.message).toEqual(action.payload.message);
    });
    it('should set isLoading to true on loading', () => {
      const action = { type: `${actions.GET_FAVORITE_ARTICLES}_LOADING`};
      const state = favoriteArticles(initFavArticleState, action);
      expect(state.isLoading).toEqual(true);
    });
    it('should update nextArticle value when DISPLAY_NEXT_FAVORITE_ARTICLE is dispatched', () => {
      const action = {
        type: actions.DISPLAY_NEXT_FAVORITE_ARTICLE,
        payload: 'nextArticle'
      }
      const state = favoriteArticles(initFavArticleState, action);
      expect(state.nextArticle).toEqual(action.payload);
    });
  });

  describe('Testing topRated', () => {
    it('should return the initial state if no action type is passed', () => {
      const state = topRated(initialTopRatedState);
      expect(state).toEqual(initialTopRatedState);
    });
    it('should return the initial state if no initial state is passed', () => {
      const state = topRated();
      expect(state).toEqual(initialTopRatedState);
    });
    it('should return the initial state if no invalid action type is passed', () => {
      const state = topRated(initialTopRatedState, { type: 'INVALID' });
      expect(state).toEqual(initialTopRatedState);
    });
    it('should store the top rated articles on success', () => {
      const action = {
        type: `${actions.GET_TOP_RATED}_SUCCESS`,
        payload: {
          data: {
            topRated: ['a', 'b'],
          }
        }
      }
      const state = topRated(initialTopRatedState, action);
      expect(state.topRatedArticles).toEqual(action.payload.data.topRated);
    });
    it('should save an error message on failure', () => {
      const action = {
        type: `${actions.GET_TOP_RATED}_FAILURE`,
        payload: {
          message: 'ERROR!!'
        }
      }
      const state = topRated(initialTopRatedState, action);
      expect(state.errors.message).toEqual(action.payload.message);
    });
    it('should set isLoading to true on loading', () => {
      const action = { type: `${actions.GET_TOP_RATED}_LOADING`};
      const state = topRated(initialTopRatedState, action);
      expect(state.isLoading).toEqual(true);
    });
  });

  describe('Testing categories', () => {
    it('should return the initial state if no action type is passed', () => {
      const state = categories(initialCategoriesState);
      expect(state).toEqual(initialCategoriesState);
    });
    it('should return the initial state if no initial state is passed', () => {
      const state = categories();
      expect(state).toEqual(initialCategoriesState);
    });
    it('should return the initial state if no invalid action type is passed', () => {
      const state = categories(initialCategoriesState, { type: 'INVALID' });
      expect(state).toEqual(initialCategoriesState);
    });
    it('should store the categories on success', () => {
      const action = {
        type: `${actions.GET_CATEGORIES}_SUCCESS`,
        payload: {
          data: {
            categories: ['a', 'b'],
          }
        }
      }
      const state = categories(initialCategoriesState, action);
      expect(state.categories).toEqual(action.payload.data.categories.reverse());
    });
    it('should save an error message on failure', () => {
      const action = {
        type: `${actions.GET_CATEGORIES}_FAILURE`,
        payload: {
          message: 'ERROR!!'
        }
      }
      const state = categories(initialCategoriesState, action);
      expect(state.errors.message).toEqual(action.payload.message);
    });
    it('should set isLoading to true on loading', () => {
      const action = { type: `${actions.GET_CATEGORIES}_LOADING`};
      const state = categories(initialCategoriesState, action);
      expect(state.isLoading).toEqual(true);
    });
  });
  describe('Testing feed', () => {
    it('should return the initial state if no action type is passed', () => {
      const state = feed(initialFeedState);
      expect(state).toEqual(initialFeedState);
    });
    it('should return the initial state if no initial state is passed', () => {
      const state = feed();
      expect(state).toEqual(initialFeedState);
    });
    it('should return the initial state if no invalid action type is passed', () => {
      const state = feed(initialFeedState, { type: 'INVALID' });
      expect(state).toEqual(initialFeedState);
    });
    it('should update the active page when UPDATE_ACTIVE_PAGE is dispatched', () => {
      const action = {
        type: actions.UPDATE_ACTIVE_PAGE,
        payload: 'active page',
      }
      const state = feed(initialFeedState, action);
      expect(state.activePage).toEqual(action.payload);
    });
    it('should store the feed, active page, and articles count', () => {
      const action = {
        type: `${actions.GET_FEED}_SUCCESS`,
        payload: {
          activePage: 1,
          data: {
            feed: ['a', 'b'],
            articlesCount: 2,
          }
        }
      }
      const state = feed(initialFeedState, action);
      expect(state.feedArticles[1]).toEqual(action.payload.data.feed);
      expect(state.activePage).toEqual(action.payload.activePage);
      expect(state.articlesCount).toEqual(action.payload.data.articlesCount);
    });
    it('should save an error message on failure', () => {
      const action = {
        type: `${actions.GET_FEED}_FAILURE`,
        payload: {
          message: 'ERROR!!'
        }
      }
      const state = feed(initialFeedState, action);
      expect(state.errors.message).toEqual(action.payload.message);
    });
    it('should set isLoading to true on loading', () => {
      const action = { type: `${actions.GET_FEED}_LOADING`};
      const state = feed(initialFeedState, action);
      expect(state.isLoading).toEqual(true);
    });
  });
});
