import types from '../actions/actionTypes';

export const initialState = {
  isLoading: false,
  errors: {
    status: false,
    message: '',
    response: {},
  },
  likes: [],
  like: {

  },
  likesCount: 0,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case `${types.GET_LIKES}_SUCCESS`:
    return {
      ...state,
      likes: action.payload.data.data,
      likesCount: action.payload.data.totalLikes
    };
  case `${types.GET_LIKES}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${types.GET_LIKES}_FAILURE`:
    return {
      ...state,
      isLoading: false,
      errors: {
        message: action.payload.message,
        response: action.payload.response,
      }
    };
  case `${types.LIKE_ARTICLE}_LOADING`:
    return {
      ...state,
      isLoading: true,
    };
  case `${types.LIKE_ARTICLE}_SUCCESS`: {
    return {
      ...state,
      like: {
        ...state.like,
        [action.payload.data.data.slug]: true
      },
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
    const newLikes = [...state.likes].slice(1, prevLikesCount);
    return {
      ...state,
      like: {
        ...state.like,
        [action.payload.slug]: false
      },
      likes: newLikes,
      likesCount: prevLikesCount - 1,
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
