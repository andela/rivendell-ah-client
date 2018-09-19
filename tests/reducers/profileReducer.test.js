import profileReducer, { initialState } from '../../src/reducers/profileReducer';
import actions from '../../src/actions/actionTypes';

const randomAction = {
  type: 'RANDOM_ACTION',
  payload: {
    username: 'somebody',
    firstName: 'somebody',
    lastName: 'somebody',
  }
}
const action1 = {
  type: 'PROFILE_UPDATE_SUCCESS',
  payload: {
    data: {
      profile: {
        username: 'somebody',
        firstName: 'somebody',
        lastName: 'somebody',
      }
    }
  }
}
const action2 = {
  type: 'PROFILE_UPDATE_SUCCESS',
  payload: {
    data: {
      user: {
        username: 'somebod',
        firstName: 'somebod',
        lastName: 'somebod',
      }
    }
  }
}

describe('Testing profileReducer', () => {
  it('should return the initial state if no action type is passed', () => {
    const state = profileReducer(initialState);
    expect(state).toEqual(initialState);
  });
  it('should return the initial state if no initial state is passed', () => {
    const state = profileReducer();
    expect(state).toEqual(initialState);
  });
  it('should return the initial state if no invalid action type is passed', () => {
    const state = profileReducer(initialState, { type: 'INVALID' });
    expect(state).toEqual(initialState);
  });
  it('should the redirect param in the state when UPDATE_REDIRECT is dispatched', () => {
    const state = profileReducer(initialState, { type: 'UPDATE_REDIRECT' });
    expect(state.redirect).toEqual(false);
  });
  it('should set the profile to an empty object when LOGOUT is dispatched', () => {
    const action = { type: actions.LOGOUT};
    const state = profileReducer(initialState, action);
    expect(state.userProfile).toEqual({});
  });
  it('should set the action payload to the profile when LOGGED_IN_USER_PROFILE is dispatched', () => {
    const action = { type: actions.LOGGED_IN_USER_PROFILE, payload: { username: 'megame' } };
    const state = profileReducer(initialState, action);
    expect(state.userProfile).toEqual(action.payload);
  });
});

describe('Test profile reducer', () => {
  it('it should return the state when no matching type is found', () => {
    const currentState = profileReducer(initialState, randomAction);
    expect(currentState).toEqual(initialState)
  });

  it('it should return the new state of the given an appropriate action', () => {
    const action = {
      type: 'PROFILE_SUCCESS',
      payload: {
        data: {
          profile: {
            username: 'somebody',
            firstName: 'somebody',
            lastName: 'somebody',
          }
        }
      }
    }
    const expectedState = {
      ...initialState,
      profile: action.payload.data.profile
    }
    const currentState = profileReducer(initialState, action);
    expect(currentState).toEqual(expectedState)
  });

  it('it should return an updated state if profile update is successful', () => {
    const oldState = {
      ...initialState,
      userProfile: action1.payload.data.profile
    };
    const expectedState = {
      ...initialState,
      userProfile: action2.payload.data.user,
      redirect: true,
    };
    const currentState = profileReducer(oldState, action2);
    expect(currentState).toEqual(expectedState);
  });

  it('it should have isLoading true if profile is loading', () => {
    const action = {
      type: 'PROFILE_LOADING',
    }
    const expectedState = {
      ...initialState,
      isLoading: true,
    }
    const currentState = profileReducer(initialState, action);
    expect(currentState).toEqual(expectedState)
  });

  it('it should have isLoading=true if update profile is loading', () => {
    const action = {
      type: 'PROFILE_UPDATE_LOADING',
    }
    const expectedState = {
      ...initialState,
      isLoading: true,
    }
    const currentState = profileReducer(initialState, action);
    expect(currentState).toEqual(expectedState)
  });

  it('it should error properties if profile loading fails', () => {
    const action = {
      type: 'PROFILE_FAILURE',
      payload: {
        message: 'something did not go right',
        response: '',
      }
    }
    const expectedState = {
      ...initialState,
      isLoading: false,
      errors: {
        status: true,
        message: action.payload.message,
        response: action.payload.response,
      },
    }
    const currentState = profileReducer(initialState, action);
    expect(currentState).toEqual(expectedState)
  });

  it('it should error properties if profile loading fails', () => {
    const action = {
      type: 'PROFILE_UPDATE_FAILURE',
      payload: {
        message: 'something did not go right',
        response: '',
      }
    }
    const expectedState = {
      ...initialState,
      isLoading: false,
      errors: {
        status: true,
        message: action.payload.message,
        response: action.payload.response,
      },
    }
    const currentState = profileReducer(initialState, action);
    expect(currentState).toEqual(expectedState)
  });
})
