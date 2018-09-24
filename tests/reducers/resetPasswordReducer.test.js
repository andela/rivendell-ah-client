import { resetPasswordLink, resetPassword, initialState, prevState }
  from '../../src/reducers/resetPasswordReducers';

describe('resetPasswordLink test', () => {
  it('should return the state when no matching action type', () => {
    const randomAction = {
      type: 'SOME_RANDOM_TYPE',
      payload: {
        data: [1, 2, 3]
      }
    };
    const currentState = resetPasswordLink(initialState, randomAction);
    expect(currentState).toEqual(initialState);
  });
  it('should return the state a loading action', () => {
    const action = {
      type: 'RESET_PASSWORD_LINK_LOADING',
      payload: {
        isLoading: true,
        success: { status: false, message: "" },
        error: { status: false, message: "" },
      }
    };
    const newState = {
      isLoading: true,
      success: action.payload.success,
      error: action.payload.error
    };
    const state = resetPasswordLink(initialState, action);
    expect(state).toEqual(newState);
  });
  it('should return the state for a success action', () => {
    const action = {
      type: 'RESET_PASSWORD_LINK_SUCCESS',
      payload: {
        isLoading: false,
      success: {
        status: true,
        message: 'action.payload.data.message',
      },
      data: {
        message: 'action.payload.data.message',
      },
      error: { status: false },
      }
    };
    const newState = {
      ...initialState,
      success: action.payload.success,
      error: action.payload.error
    };
    const state = resetPasswordLink(initialState, action);
    expect(state).toEqual(newState);
  });

  it('should return the state for a failed action', () => {
    const action = {
      type: 'RESET_PASSWORD_LINK_FAILURE',
      payload: {
      isLoading: false,
      success: {status: false },
      response: {
        status: 0,
        data: { errors: 'message' },
      },
      error: {
        status: true,
        statusCode: 0,
        message: '',
      }
      }
    };
    const newState = {
      ...initialState,
      success: action.payload.success,
      error: action.payload.error
    };
    const state = resetPasswordLink(initialState, action);
    expect(state).toEqual(newState);
  });

  it('should return the state when an action type matches is not specified', () => {
    const newState = {
      ...initialState,
    };
    const state = resetPasswordLink(initialState);
    expect(state).toEqual(newState);
  });
});



describe('resetPassword test', () => {
  it('should return the state when no matching action type', () => {
    const randomAction = {
      type: 'SOME_RANDOM_TYPE',
      payload: {
        data: [1, 2, 3]
      }
    };
    const currentState = resetPasswordLink(initialState, randomAction);
    expect(currentState).toEqual(initialState);
  });
  it('should return the state that matches RESET_PASSWORD_TOKEN', () => {
    const action = {
      type: 'RESET_PASSWORD_TOKEN',
    };
    const newState = {
      ...prevState,
    };
    const state = resetPassword(prevState, action);
    expect(state).toEqual(newState);
  });
  it('should return the state a loading action', () => {
    const action = {
      type: 'RESET_PASSWORD_LOADING',
      payload: {
        resetToken: '',
        isLoading: true,
        success: { status: false, message: '' },
        error: { status: false, message: '' },
      }
    };
    const newState = {
      isLoading: true,
      resetToken: action.payload.resetToken,
      success: action.payload.success,
      error: action.payload.error,
    };
    const state = resetPassword(prevState, action);
    expect(state).toEqual(newState);
  });
  it('should return the state for a success action', () => {
    const action = {
      type: 'RESET_PASSWORD_SUCCESS',
      payload: {
        resetToken: '',
        isLoading: false,
      success: {
        status: true,
        message: '',
      },
      data: {
        message: '',
      },
      error: { status: false },
      }
    };
    const newState = {
      ...prevState,
      resetToken: action.payload.resetToken,
      success: action.payload.success,
      error: action.payload.error
    };
    const state = resetPassword(prevState, action);
    expect(state).toEqual(newState);
  });

  it('should return the state for a failed action', () => {
    const action = {
      type: 'RESET_PASSWORD_FAILURE',
      payload: {
      isLoading: false,
      success: {status: false },
      response: {
        status: 0,
        data: { errors: 'message' },
      },
      error: {
        status: true,
        statusCode: 0,
        message: '',
      }
      }
    };
    const newState = {
      ...prevState,
      success: action.payload.success,
      error: action.payload.error
    };
    const state = resetPassword(prevState, action);
    expect(state).toEqual(newState);
  });

  it('should return the state when an action type matches is not specified', () => {
    const newState = {
      ...prevState,
    };
    const state = resetPassword(prevState);
    expect(state).toEqual(newState);
  });
});
