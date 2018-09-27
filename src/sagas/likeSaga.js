import { takeEvery, put } from 'redux-saga/effects';
import types from '../actions/actionTypes';
import axiosInstance from '../services/requestHandler';

/**
 * @param {Object} action action
 * @returns {null} null
 */
function* unlikeArticle(action) {
  const { slug, token } = action.payload;
  try {
    yield put({
      type: `${types.UNLIKE_ARTICLE}_LOADING`,
    });

    yield axiosInstance().delete(
      `/articles/${slug}/like`,
      { headers: { Authorization: `${token}` } }
    );
    yield put({
      type: `${types.UNLIKE_ARTICLE}_SUCCESS`,
      payload: {
        slug
      }
    });
  } catch (err) {
    yield put({
      type: `${types.UNLIKE_ARTICLE}_FAILURE`,
      payload: err
    });
  }
}

/**
 * @returns {null} null
 */
export function* watchUnlikeArticle() {
  yield takeEvery(types.UNLIKE_ARTICLE, unlikeArticle);
}
export default {};
