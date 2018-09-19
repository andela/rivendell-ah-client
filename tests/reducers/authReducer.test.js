import authReducer, { initialState } from '../../src/reducers/authReducer';
import actions from '../../src/actions/actionTypes';

describe('Testing authReducer', () => {
  it('should return the initial state if no action type is passed', () => {
    const state = authReducer(initialState);
    expect(state).toEqual(initialState);
  });
  it('should return the initial state if no initial state is passed', () => {
    const state = authReducer();
    expect(state).toEqual(initialState);
  });
  it('should return the initial state if no invalid action type is passed', () => {
    const state = authReducer(initialState, { type: 'INVALID' });
    expect(state).toEqual(initialState);
  });
  it('should save a token to the state upon successful login', () => {
    const action = {
      type: `${actions.LOGIN}_SUCCESS`,
      payload: {
        token: 'newtoken'
      }
    }
    const expectedState = {
      ...initialState,
      isLoading: false,
      errors: {
        message: '',
        response: {},
      },
      token: action.payload.token
    }
    const state = authReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
  it('should save a token to the state when persist login action is dispatched', () => {
    const action = {
      type: actions.PERSIST_LOGIN,
      payload: {
        token: 'newtoken'
      }
    }
    const expectedState = {
      ...initialState,
      token: action.payload.token
    }
    const state = authReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
  it('should clear a declared error response filed when CLEAR_API_VALIDATION_ERR is dispatched', () => {
    const prevState = {
      ...initialState,
      errors: {
        message: '',
        response: {
          email: 'email error'
        }
      }
    }
    const action = { type: actions.CLEAR_API_VALIDATION_ERR, payload: 'email' }
    const state = authReducer(prevState, action);
    expect(state.errors.response.email).toEqual('');
  });
  it('should clear all api errors when CLEAR_ALL_API_VALIDATION_ERRS is dispatched', () => {
    const prevState = {
      ...initialState,
      errors: {
        message: 'message',
        response: {
          email: 'email error'
        }
      }
    }
    const action = { type: actions.CLEAR_ALL_API_VALIDATION_ERRS };
    const state = authReducer(prevState, action);
    expect(state.errors.response).toEqual({});
    expect(state.errors.message).toEqual('');
  });
  it('should set isLoading to true when LOGIN_LOADING is dispatched', () => {
    const action = { type: `${actions.LOGIN}_LOADING`};
    const state = authReducer(initialState, action);
    expect(state.isLoading).toEqual(true);
  });
  it('should set token to an empty string when LOGOUT is dispatched', () => {
    const action = { type: actions.LOGOUT};
    const state = authReducer(initialState, action);
    expect(state.token).toEqual('');
  });
  it('should save an error message to the state when LOGIN_FAILURE is dispatched', () => {
    const action = {
      type: `${actions.LOGIN}_FAILURE`,
      payload: {
        message: 'ERROR!!'
      }
    }
    const state = authReducer(initialState, action);
    expect(state.errors.message).toEqual(action.payload.message);
  });

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
    it('should return the state when an action is not specified', () => {
        const newState = {
            ...initialState,
        }
        const state = authReducer(initialState)
        expect(state).toEqual(newState);
    });
    it('should set isLoading to true when SIGN_UP_LOADING is dispatched', () => {
      const action = { type: `${actions.SIGN_UP}_LOADING`};
      const state = authReducer(initialState, action);
      expect(state.isLoading).toEqual(true);
    });
    it('should save an error message to the state when SIGN_UP_FAILURE is dispatched', () => {
      const action = {
        type: `${actions.SIGN_UP}_FAILURE`,
        payload: {
          message: 'ERROR!!'
        }
      }
      const state = authReducer(initialState, action);
      expect(state.errors.message).toEqual(action.payload.message);
    });
});
