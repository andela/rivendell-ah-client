import axios from 'axios';
import types from './actionTypes';


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRkMWUxNDBiLTJiYWUtNDZiYy1hMzk4LTIyOGJmY2I2NjdiZiIsInVzZXJuYW1lIjoic3Rldm4iLCJlbWFpbCI6ImNoaWRpb2d1ZWppb2ZyQGdtYWlsLmNvbSIsImlhdCI6MTUzNjcwNzg1MywiZXhwIjoxNTM2OTY3MDUzfQ.2URXcRgExDvW0Xqdtx0uL04qXKjzLsJ211qDRvdr5NM';

const createArticle = (article) => {
  console.log(article, 'just before axios');
  return {
    type: types.CREATE_ARTICLE,
    payload: axios.post('http://localhost:3000/api/articles', {
      article,
    }, {
      headers: {
        Authorization: token,
      }
    })
  };
};
export default createArticle;
