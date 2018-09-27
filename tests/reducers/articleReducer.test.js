import articleReducer, { initialState } from '../../src/reducers/articleReducer';
import actions from '../../src/actions/actionTypes';


describe('Testing articleReducer', () => {
    it('should return the state when no matching action type', () => {
        const randomAction = {
            type: 'SOME_RANDOM_TYPE',
            payload: {
                data: [1, 2, 3]
            }
        }
        const currentState = articleReducer(initialState, randomAction)
        expect(currentState).toEqual(initialState);

    })
    it('should return the state with isLoading set to true when the GET_ARTICLE_LOADING ACTION is dispatched', () => {
        const action = {
            type: `${actions.GET_ARTICLE}_LOADING`,
            payload: {
                data: {
                    article: {
                        title: 'title',
                        description: 'description',
                        body: 'body'
                    },
                }
            }
        }
        const newState = {
            ...initialState,
            isLoading: true,
        }
        const state = articleReducer(initialState, action)
        expect(state).toEqual(newState);
    })
    it('should return the state with isLoading false and an empty error message and response for GET_ARTICLE_FAILURE action type', () => {
        const action = {
            type: `${actions.GET_ARTICLE}_FAILURE`,
            payload: {
                data: {
                    article: {
                        title: 'title',
                        description: 'description',
                        body: 'body'
                    },
                }
            }
        }
        const newState = {
            ...initialState,
            isLoading: false,
            errors: {
            }
        }
        const state = articleReducer(initialState, action)
        expect(state).toEqual(newState);
    })
    it('should return the state with an article for GET_ARTICLE_SUCCESS action type', () => {
        const action = {
            type: `${actions.GET_ARTICLE}_SUCCESS`,
            payload: {
                data: {
                    article: {
                        title: 'title',
                        description: 'description',
                        body: 'body'
                    },
                }
            }
        }
        const newState = {
            ...initialState,
            article: action.payload.data.article
        }
        const state = articleReducer(initialState, action)
        expect(state).toEqual(newState);
    })
    it('should return the state when an action is not specified', () => {
        const newState = {
            ...initialState,
        }
        const state = articleReducer(initialState)
        expect(state).toEqual(newState);
    })
});