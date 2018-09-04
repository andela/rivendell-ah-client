import chai from 'chai';
import deleteArticleReducer from '../../src/reducers/deleteArticleReducer';
import types from '../../src/actions/actionTypes';

const initialState = {
  isLoading: false,
  success: false,
  article: {},
  errors: {}
};
describe('loadArticleReducer', () => {
  describe('basic behaviour of the reducer', () => {
    it('should return the initital state when no state is specified', () => {
      const newState = deleteArticleReducer();
      chai.expect(newState)
        .to.eql(initialState);
    });

    it(`should return a new state with loading equal to true when ${types.DELETE_ARTICLE}_LOADING is passed`, () => {
      const action = {
        type: `${types.DELETE_ARTICLE}_LOADING`
      };
      const newState = deleteArticleReducer(undefined, action);
      chai.expect(newState.isLoading)
        .to.equal(true);
    });


    it(`should return a new state with retrieved data when ${types.DELETE_ARTICLE}_SUCCESS is passed`, () => {
      const action = {
        type: `${types.DELETE_ARTICLE}_SUCCESS`,
      };
      const newState = deleteArticleReducer(undefined, action);
      chai.expect(newState.success)
        .to.equal(true);
      chai.expect(newState.errors)
        .to.eql({});
    });

    it(`should return a new state with errors when ${types.DELETE_ARTICLE}_FAILURE is passed`, () => {
      const action = {
        type: `${types.DELETE_ARTICLE}_FAILURE`,
        payload: {
          statusCode: 400
        }
      };
      const newState = deleteArticleReducer(undefined, action);
      chai.expect(newState.isLoading)
        .to.equal(false);
      chai.expect(newState.errors.status)
        .to.equal(action.payload.statusCode);
    });
  });
});
