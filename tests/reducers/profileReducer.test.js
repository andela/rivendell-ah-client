import profileReducer, { initialState } from '../../src/reducers/profileReducer';
import actions from '../../src/actions/actionTypes';

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
  it('should set the profile to an empty object when LOGOUT is dispatched', () => {
    const action = { type: actions.LOGOUT};
    const state = profileReducer(initialState, action);
    expect(state.profile).toEqual({});
  });
  it('should set the action payload to the profile when LOGGED_IN_USER_PROFILE is dispatched', () => {
    const action = { type: actions.LOGGED_IN_USER_PROFILE, payload: { username: 'megame' } };
    const state = profileReducer(initialState, action);
    expect(state.profile).toEqual(action.payload);
  });
});
