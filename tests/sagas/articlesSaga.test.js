import store from '../../src/store';
import types from '../../src/actions/actionTypes';

describe('Testing articles saga', () => {
  it ('should call loadFeaturedArticlesOnLogout when LOGOUT is dispatched', () => {
    store.dispatch({ type: types.LOGOUT});
    const state = store.getState();
    const { articles } = state;
    expect(articles.isLoading).toEqual(true);
  });
  it ('should call getFeed when GET_FEED is dispatched', () => {
    store.dispatch({ type: types.GET_FEED, payload: { limit: 4, activePage: 1 }});
    const state = store.getState();
    const { feed } = state;
    expect(feed.isLoading).toEqual(true);
  });
});
