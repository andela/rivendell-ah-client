import axios from 'axios';
import types from './actionTypes';

const login = formData => ({
  type: types.LOGIN,
  payload: axios
    .post('http://localhost:3000/api/users/login', { user: formData }),
});

export default {
  login,
};
