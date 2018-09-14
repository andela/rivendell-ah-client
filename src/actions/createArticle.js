import axios from 'axios';
import types from './actionTypes';


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6I'
+ 'mRkMWUxNDBiLTJiYWUtNDZiYy1hMzk4LTIyOGJmY2I2NjdiZiIsInVzZXJ'
+ 'uYW1lIjoic3Rldm4iLCJlbWFpbCI6ImNoaWRpb2d1ZWppb2ZyQGdtYWlsL'
+ 'mNvbSIsImlhdCI6MTUzNjcwNzg1MywiZXhwIjoxNTM2OTY3MDUzfQ.2URXc'
+ 'RgExDvW0Xqdtx0uL04qXKjzLsJ211qDRvdr5NM';

const createArticle = article => ({
  type: types.CREATE_ARTICLE,
  payload: axios.post('http://localhost:3000/api/articles', {
    article,
  }, {
    headers: {
      Authorization: token,
    }
  })
});

export default createArticle;
