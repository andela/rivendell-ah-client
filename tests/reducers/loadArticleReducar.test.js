import { shallow } from 'enzyme';
import chai from 'chai';
import loadArticleReducer from '../../src/reducers/loadArticleReducer';
import types from '../../src/actions/actionTypes';

const initialState = {
  article: {},
  isLoading: false,
  success: false,
  errors: {}
};
describe('loadArticleReducer', () => {
  describe('basic behaviour of the reducer', () => {
    it('should return the initital state when no state is specified', () => {
      const newState = loadArticleReducer();
      chai.expect(newState)
        .to.eql(initialState);
    });

    it(`should return a new state with loading equal to true when ${types.LOAD_ARTICLE}_LOADING is passed`, () => {
      const action = {
        type: `${types.LOAD_ARTICLE}_LOADING`
      };
      const newState = loadArticleReducer(undefined, action);
      chai.expect(newState.isLoading)
        .to.equal(true);
    });


    it(`should return a new state with retrieved data when ${types.LOAD_ARTICLE}_SUCCESS is passed`, () => {
      const action = {
        type: `${types.LOAD_ARTICLE}_SUCCESS`,
        payload: {
          data: {
            article: {
              title: 'the title',
              body: 'the bad body',
              image: 'http://url.com',
              description: 'this is the main description',
            }
          }
        }
      };
      const newState = loadArticleReducer(undefined, action);
      chai.expect(newState.success)
        .to.equal(true);
      chai.expect(newState.article)
        .to.equal(action.payload.data.article);
    });

    it(`should return a new state with errors when ${types.LOAD_ARTICLE}_FAILURE is passed`, () => {
      const action = {
        type: `${types.LOAD_ARTICLE}_FAILURE`,
        payload: {
          response: {
            status: 400,
            data: { errors: { message: 'bad data' } } }
        }
      };

      const newState = loadArticleReducer(undefined, action);
      chai.expect(newState.success)
        .to.equal(false);

      chai.expect(newState.errors.status)
        .to.equal(action.payload.response.status);
      chai.expect(newState.errors.message)
        .to.equal(action.payload.response.data.errors.message);
    });
  });
});
