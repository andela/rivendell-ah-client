import { takeEvery, put } from 'redux-saga/effects';
import types from '../actions/actionTypes';
import axiosInstance from '../services/requestHandler';

/**
 * @param {Object} action action
 * @returns {null} null
 */
function* getArticle(action) {
  const { limit, activePage } = action.payload;
  try {
    yield put({
      type: `${types.GET_ARTICLES}_LOADING`,
    });
    const data = yield axiosInstance()
      .get(`/articles?limit=${limit}&page=${activePage}`);
    yield put({
      type: `${types.GET_ARTICLES}_SUCCESS`,
      payload: {
        data: data.data,
        activePage
      }
    });
  } catch (err) {
    yield put({
      type: `${types.GET_ARTICLES}_FAILURE`,
      payload: err
    });
  }
}

/**
 * @returns {null} null
 */
export function* watchGetArticles() {
  yield takeEvery(types.GET_ARTICLES, getArticle);
}

/**
 * @param {Object} action action
 * @returns {null} null
 */
function* getFeed(action) {
  const { limit, activePage } = action.payload;
  try {
    yield put({
      type: `${types.GET_FEED}_LOADING`,
    });
    const data = yield axiosInstance()
      .get(`/users/feeds?limit=${limit}&page=${activePage}`);
    yield put({
      type: `${types.GET_FEED}_SUCCESS`,
      payload: {
        data: data.data,
        activePage
      }
    });
  } catch (err) {
    yield put({
      type: `${types.GET_FEED}_FAILURE`,
      payload: err
    });
  }
}

/**
 * @returns {null} null
 */
export function* watchGetFeed() {
  yield takeEvery(types.GET_FEED, getFeed);
}

/**
 * @returns {null} null
 */
function* loadFeaturedArticlesOnLogout() {
  yield put({
    type: types.GET_ARTICLES,
    payload: {
      activePage: 1,
      limit: 4,
    }
  });
}

/**
 * @returns {null} null
 */
export function* watchLogout() {
  yield takeEvery(types.LOGOUT, loadFeaturedArticlesOnLogout);
}

export default {};
