import configureStore from 'redux-mock-store';
import actionTypes from '../../../src/actions/actionTypes';
import { getProfile, updateProfile } from '../../../src/actions/profile';
import axiosInstance from '../../../src/services/requestHandler'
const mockStore = configureStore();
const store = mockStore();

describe('Testing Update Profile', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('Dispatching an action', () => {
    it('should dispatch the appropriate action and type', () => {
      const payload = () => {};
      const expectedAction = [
        {
          type: actionTypes.PROFILE,
          payload: axiosInstance().get('path'),
        }
      ]
      store.dispatch(getProfile(payload))
      expect(store.getActions()).toEqual(expectedAction)
    })
  });

  describe('Dispatching an action', () => {
    it('should dispatch the appropriate action and type', () => {
      const payload = () => {};
      const expectedAction = [
        {
          type: actionTypes.PROFILE_UPDATE,
          payload: axiosInstance().put('path'),
        }
      ]
      store.dispatch(updateProfile(payload))
      expect(store.getActions()).toEqual(expectedAction)
    })
  });
});