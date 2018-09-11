import axios from 'axios';
import types from './actionTypes';

const createArticle = article => ({
  type: types.CREATE_ARTICLE,
  payload: axios.post('http://localhost:3000/api/articles', {
    article,
  })
});
export default createArticle;
