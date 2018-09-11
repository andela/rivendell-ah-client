import axios from 'axios';
import types from './actionTypes';

const createArticle = () => ({
  type: types.CREATE_ARTICLE,
});
export default createArticle;
