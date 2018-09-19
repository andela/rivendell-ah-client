import types from '../actions/actionTypes';

export const initialState = {
  isLoading: false,
  errors: {
    status: false,
    message: '',
    response: {},
  },
  likes: [],
  like: false,
  likesCount: 0,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case types.STORE_LIKES:
    return {
      ...state,
      likes: action.payload.likes,
      likesCount: action.payload.likesCount
    };
  case `${types.LIKE_ARTICLE}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${types.LIKE_ARTICLE}_SUCCESS`: {
    const prevLikesCount = state.likesCount;
    const prevLikes = state.likes;
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log('payloaddddd', action.payload);
    return {
      ...state,
      like: true,
      likesCount: prevLikesCount + 1,
      likes: [...prevLikes, { userId: user.id }]
    };
  }
  case `${types.LIKE_ARTICLE}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  case `${types.UNLIKE_ARTICLE}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${types.UNLIKE_ARTICLE}_SUCCESS`: {
    const prevLikesCount = state.likesCount;
    const prevLikes = [...state.likes];
    const newLikes = prevLikes.splice(0, prevLikesCount - 1);
    return {
      ...state,
      like: false,
      likesCount: prevLikesCount - 1,
      likes: newLikes,
    };
  }
  case `${types.UNLIKE_ARTICLE}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  default:
    return state;
  }
};
