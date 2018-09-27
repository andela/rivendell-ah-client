import axiosInstance from '../services/requestHandler';
import types from './actionTypes';

const getProfile = path => ({
  type: types.PROFILE,
  payload: axiosInstance().get(path),
});

const updateProfile = (path, data) => ({
  type: types.PROFILE_UPDATE,
  payload: axiosInstance().put(path, {
    user: data,
  }),
});

const updateRedirect = () => ({
  type: types.UPDATE_REDIRECT,
  payload: true,
});

export {
  getProfile,
  updateProfile,
  updateRedirect,
};
