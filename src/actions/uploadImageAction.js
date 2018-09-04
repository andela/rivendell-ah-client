import dotenv from 'dotenv';
import cloudinary from '../services/cloudinaryInstance';
import 'dotenv/config';
import types from './actionTypes';
import store from '../store';

dotenv.config();


const uploadImageAction = (payload, status) => ({
  type: `${types.UPLOAD_IMAGE}_${status}`,
  payload,
});

const upload = (imagePath) => {
  store.dispatch(uploadImageAction(null, 'LOADING'));
  cloudinary.uploader.upload(imagePath, (result) => {
    if (!result) {
      return store.dispatch(uploadImageAction(result, 'FAILURE'));
    }
    store.dispatch(uploadImageAction(result, 'SUCCESS'));
  });
};


export default upload;
