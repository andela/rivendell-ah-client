import axios from 'axios';
import types from './actionTypes';

const loadCategories = () => ({
  type: types.LOAD_CATEGORIES,
  payload: axios.get('http://localhost:3000/api/categories'),
});
export default loadCategories;
