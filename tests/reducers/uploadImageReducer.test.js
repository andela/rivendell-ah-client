import { shallow } from 'enzyme';
import chai from 'chai';
import uploadImageReducer from '../../src/reducers/uploadImageReducer';
import types from '../../src/actions/actionTypes';

const initialState = {
  isLoading: false,
  success: false,
  imageUrl: ''
};

describe('uploadImageReducer', () => {
  describe('basic behaviour of the reducer', () => {
    it('should return the initital state when no state is specified', () => {
      const newState = uploadImageReducer();
      chai.expect(newState)
        .to.eql(initialState);
    });

    it(`should return a new state with loading equal to true when ${types.UPLOAD_IMAGE}_LOADING is passed`, () => {
      const action = {
        type: `${types.UPLOAD_IMAGE}_LOADING`
      };
      const newState = uploadImageReducer(undefined, action);
      chai.expect(newState.isLoading)
        .to.equal(true);
    });


    it(`should return a new state with retrieved data when ${types.UPLOAD_IMAGE}_SUCCESS is passed`, () => {
      const action = {
        type: `${types.UPLOAD_IMAGE}_SUCCESS`,
        payload: {
          url: 'tempURl'
        }
      };
      const newState = uploadImageReducer(undefined, action);
      chai.expect(newState.success)
        .to.equal(true);
      chai.expect(newState.imageUrl)
        .to.equal(action.payload.url);
    });

    it(`should return a new state with errors when ${types.UPLOAD_IMAGE}_FAILURE is passed`, () => {
      const action = {
        type: `${types.UPLOAD_IMAGE}_FAILURE`,
      };

      const newState = uploadImageReducer(undefined, action);
      chai.expect(newState.success)
        .to.equal(false);

      chai.expect(newState.isLoading)
        .to.equal(false);
    });
  });
});
