/* eslint max-len:off */
import chai from 'chai';
import updateArticleReducer from '../../src/reducers/updateArticleReducer';
import types from '../../src/actions/actionTypes';

const initialState = {
  editing: true,
  isLoading: false,
  success: false,
  article: {},
  errors: {}
};
describe('testing createArticleReducer', () => {
  it('should return the initial state when no action is passed ', () => {
    const newState = updateArticleReducer(undefined);
    chai.expect(newState)
      .to.eql(initialState);
  });

  it(`should return a new state with editing equal to true when ${types.UPDATE_ARTICLE}_EDITING is passed`, () => {
    const action = {
      type: `${types.UPDATE_ARTICLE}_EDITING`
    };
    const newState = updateArticleReducer(undefined, action);
    chai.expect(newState.editing)
      .to.equal(true);
  });

  it(`should return a new state with loadin equal to true when ${types.UPDATE_ARTICLE}_LOADING is passed`, () => {
    const action = {
      type: `${types.UPDATE_ARTICLE}_LOADING`
    };
    const newState = updateArticleReducer(undefined, action);
    chai.expect(newState.isLoading)
      .to.equal(true);
    chai.expect(newState.editing)
      .to.equal(false);
  });


  it(`should return a new state with retrieved data when ${types.UPDATE_ARTICLE}_SUCCESS is passed`, () => {
    const action = {
      type: `${types.UPDATE_ARTICLE}_SUCCESS`,
      payload: {
        data: { article: 'bad data' }
      }
    };
    const newState = updateArticleReducer(undefined, action);
    chai.expect(newState.success)
      .to.equal(true);
    chai.expect(newState.editing)
      .to.equal(false);
    chai.expect(newState.article)
      .to.equal(action.payload.data.article);
  });


  it(`should return a new state with errors when ${types.UPDATE_ARTICLE}_FAILURE is passed`, () => {
    const action = {
      type: `${types.UPDATE_ARTICLE}_FAILURE`,
      payload: {
        response: {
           message: 'bad data',
           statusCode: 400
         }
      }
    };
    const newState = updateArticleReducer(undefined, action);
    chai.expect(newState.isLoading)
      .to.equal(false);
    chai.expect(newState.errors.status)
      .to.equal(action.payload.response.statusCode);
    chai.expect(newState.errors.message)
      .to.equal(action.payload.response.message);
  });

  it('should modify state in an immutable way', () => {
    const firstAction = {
      type: `${types.UPDATE_ARTICLE}_EDITING_ARTICLE`
    };
    const firstState = updateArticleReducer(undefined, firstAction);

    const secondAction = {
      type: `${types.UPDATE_ARTICLE}_LOADING`
    };
    const secondState = updateArticleReducer(firstState, secondAction);

    // check that the first state is valid
    chai.expect(firstState.editing)
      .to.equal(true);
    chai.expect(firstState.isLoading)
      .to.equal(initialState.isLoading);
    chai.expect(firstState.isLoading)
      .to.eql(initialState.isLoading);
    chai.expect(firstState.success)
      .to.equal(initialState.success);

    // should  pass deep equality
    chai.expect(firstState.article)
      .to.eql(initialState.article);

    // testing the second state
    chai.expect(secondState.editing)
      .to.equal(false);
    chai.expect(secondState.isLoading)
      .to.equal(true);
    chai.expect(secondState.success)
      .to.equal(firstState.success);
    chai.expect(secondState.article)
      .to.equal(firstState.article);
  });
});
