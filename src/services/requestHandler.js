import axios from 'axios';

/**
 * This functon creates an instance of axios and return
 * it for making API request
 * @returns { instance } an instance of axios
 */
const axiosInstance = () => {
  let apiUrl = 'https://authorhaven.herokuapp.com/api';
  if (process.env.NODE_ENV === 'development') {
    apiUrl = 'http://localhost:3000/api';
  }

  let token = '';
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  // const headers = new Headers();
  // // headers.append('Content-Type', 'application/json');
  // // headers.append('Authorization', token);
  const instanceCreate = axios
    .create({
      baseURL: apiUrl,

      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    });
  return instanceCreate;
};

export default axiosInstance;
