import types from './actionTypes';
import axiosInstance from '../services/requestHandler';

const loadCategories = () => ({
  type: types.LOAD_CATEGORIES,
  payload: axiosInstance().get('/categories'),
});
export default loadCategories;
