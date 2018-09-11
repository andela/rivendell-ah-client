import authReducer, { initialState } from '../../src/reducers/authReducer';

describe('Testing the authReducer', () => {
    it('should return the state when no matching action type', () => {
        const randomAction = {
            type: 'SOME_RANDOM_TYPE',
            payload: {
                data: [1, 2, 3]
            }
        }
        const currentState = authReducer(initialState, randomAction)
        expect(currentState).toEqual(initialState);

    })
    it('should return the state when an action type matches', () => {
        const action = {
            type: 'SOCIAL_LOGIN',
            payload: {
                user: {
                    username:'username',
                    lastName:'lastname',
                    token: ''
                }, 
            }
        }
        const newState = {
            ...initialState,
            token: action.payload.user.token
        }
        const state = authReducer(initialState, action)
        expect(state).toEqual(newState);
    })
    it('should return the state when an action type matches is not specified', () => {
        const newState = {
            ...initialState,
        }
        const state = authReducer(initialState)
        expect(state).toEqual(newState);
    })
});
