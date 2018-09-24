import likeReducer, { initialState } from '../../src/reducers/likeReducer';
import actions from '../../src/actions/actionTypes';
import mockData from '../config/mockData';
const { getLikesData, likeData } = mockData;
describe('Testing articleReducer', () => {
    it('should return the state when no matching action type', () => {
        const randomAction = {
            type: 'SOME_RANDOM_TYPE',
            payload: {
                data: [1, 2, 3]
            }
        }
        const currentState = likeReducer(initialState, randomAction)
        expect(currentState).toEqual(initialState);
    })
    it('should return the state when an action is not specified', () => {
        const newState = {
            ...initialState,
        }
        const state = likeReducer(initialState)
        expect(state).toEqual(newState);
    })
    it('should return the state with likes and likesCount for GET_LIKES_SUCCESS action type', () => {
        const action = {
            type: `${actions.GET_LIKES}_SUCCESS`,
            payload: getLikesData
        }
        const newState = {
            ...initialState,
            likes: action.payload.data.data,
            likesCount: action.payload.data.totalLikes
        }
        const state = likeReducer(initialState, action)
        expect(state).toEqual(newState);
    })
    it('should return the state with isLoading set to true for GET_LIKES_LOADING action type', () => {
        const action = {
            type: `${actions.GET_LIKES}_LOADING`,
            payload: getLikesData
        }
        const newState = {
            ...initialState,
            isLoading: true,
        }
        const state = likeReducer(initialState, action)
        expect(state).toEqual(newState);
    })
    it('should return the state with isLoading set to false and an empty error message and response for GET_LIKES_FAILURE action type', () => {
        const action = {
            type: `${actions.GET_LIKES}_FAILURE`,
            payload: getLikesData
        }
        const newState = {
            ...initialState,
            isLoading: false,
            errors: {
            }
        }
        const state = likeReducer(initialState, action)
        expect(state).toEqual(newState);
    })
    it('should return the state with isLoading set to true for LIKE_ARTICLE_LOADING action type', () => {
        const action = {
            type: `${actions.LIKE_ARTICLE}_LOADING`,
            payload: likeData
        }
        const newState = {
            ...initialState,
            isLoading: true,
        }
        const state = likeReducer(initialState, action)
        expect(state).toEqual(newState);
    })
    it('should return the state with isLoading set to true for LIKE_ARTICLE_LOADING action type', () => {
        const action = {
            type: `${actions.LIKE_ARTICLE}_SUCCESS`,
            payload: likeData
        }
        const newState = {
            ...initialState,
            like: true,
        }
        const state = likeReducer(initialState, action)
        expect(state).toEqual(newState);
    })
    it('should return the state with isLoading set to false and an empty error message and response for LIKE_ARTICLE_FAILURE action type', () => {
        const action = {
            type: `${actions.LIKE_ARTICLE}_FAILURE`,
            payload: likeData
        }
        const newState = {
            ...initialState,
            isLoading: false,
            errors: {
                message: action.payload.message,
                response: action.payload.response,
            }
        }
        const state = likeReducer(initialState, action)
        expect(state).toEqual(newState);
    })
    it('should return the state with isLoading set to true for UNLIKE_ARTICLE_LOADING action type', () => {
        const action = {
            type: `${actions.UNLIKE_ARTICLE}_LOADING`,
            payload: {
                data: {}
            }
        }
        const newState = {
            ...initialState,
            isLoading: true,
        }
        const state = likeReducer(initialState, action)
        expect(state).toEqual(newState);
    })
    it('should return the state with isLoading set to true for LIKE_ARTICLE_LOADING action type', () => {
        const action = {
            type: `${actions.UNLIKE_ARTICLE}_SUCCESS`,
            payload: likeData
        }
        const prevLikesCount = initialState.likesCount;
        const newLikes = [...initialState.likes].slice(1, prevLikesCount);
        const newState = {
            ...initialState,
            like: false,
            likes: newLikes,
            likesCount: prevLikesCount - 1,
        }
        const state = likeReducer(initialState, action)
        expect(state).toEqual(newState);
    })
    it('should return the state with isLoading set to false and an empty error message and response for LIKE_ARTICLE_FAILURE action type', () => {
        const action = {
            type: `${actions.UNLIKE_ARTICLE}_FAILURE`,
            payload: likeData
        }
        const newState = {
            ...initialState,
            isLoading: false,
            errors: {
                message: action.payload.message,
                response: action.payload.response,
            }
        }
        const state = likeReducer(initialState, action)
        expect(state).toEqual(newState);
    })

});