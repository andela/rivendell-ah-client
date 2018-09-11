import redirectReducer, {initialState} from '../../src/reducers/redirectReducer';

describe('Testing the redirectReducer', () => {
    it('should return the state when no matching action type', () => {
        const randomAction = {
            type: 'SOME_RANDOM_TYPE',
            payload: 'Some Random payload'
        }
        const currentState = redirectReducer(initialState, randomAction)
        expect(currentState).toEqual(initialState);

    })
    it('should return the state when an action type matches', () => {
        const action = {
            type: 'SOCIAL_LOGIN_REDIRECT',
            payload: '/articles/new'
            
        }
        const newState = {
            ...initialState,
            redirectUrl: action.payload
        }
        const state = redirectReducer(initialState, action)
        expect(state).toEqual(newState);

    })
    it('should return the state when an action type matches is not specified', () => {
        const newState = {
            ...initialState,
        }
        const state = redirectReducer(initialState)
        expect(state).toEqual(newState);
    })
});
