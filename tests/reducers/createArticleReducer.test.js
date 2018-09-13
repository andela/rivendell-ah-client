/* eslint max-len:off */
import chai from 'chai';
import createArticleReducer from '../../src/reducers/createArticleReducer';
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
    chai.expect(createArticleReducer(undefined))
      .eql(initialState);
  });

  it(`should return a new state with editing equal to true when ${types.CREATE_ARTICLE}_EDITING_ARTICLE is passed`, () => {
    const action = {
      type: `${types.CREATE_ARTICLE}_EDITING_ARTICLE`
    };
    const newState = createArticleReducer(undefined, action);
    chai.expect(newState.editing)
      .to.equal(true);
  });

  it(`should return a new state with loadin equal to true when ${types.CREATE_ARTICLE}_LOADING is passed`, () => {
    const action = {
      type: `${types.CREATE_ARTICLE}_LOADING`
    };
    const newState = createArticleReducer(undefined, action);
    chai.expect(newState.isLoading)
      .to.equal(true);
    chai.expect(newState.editing)
      .to.equal(false);
  });


  it(`should return a new state with retrieved data when ${types.CREATE_ARTICLE}_SUCCESS is passed`, () => {
    const action = {
      type: `${types.CREATE_ARTICLE}_SUCCESS`,
      payload: {
        response: { data: 'bad data' }
      }
    };
    const newState = createArticleReducer(undefined, action);
    chai.expect(newState.success)
      .to.equal(true);
    chai.expect(newState.editing)
      .to.equal(false);
    chai.expect(newState.article)
      .to.equal(action.payload.response.data);
  });


  it(`should return a new state with errors when ${types.CREATE_ARTICLE}_FAILURE is passed`, () => {
    const action = {
      type: `${types.CREATE_ARTICLE}_FAILURE`,
      payload: {
        response: {
          status: 400,
          data: { errors: { message: 'bad data' } } }
      }
    };
    const newState = createArticleReducer(undefined, action);
    chai.expect(newState.isLoading)
      .to.equal(false);
    chai.expect(newState.error.status)
      .to.equal(action.payload.response.status);
    chai.expect(newState.error.message)
      .to.equal(action.payload.response.data.errors.message);
  });

  it('should modify state in an immutable way', () => {
    const firstAction = {
      type: `${types.CREATE_ARTICLE}_EDITING_ARTICLE`
    };
    const firstState = createArticleReducer(undefined, firstAction);

    const secondAction = {
      type: `${types.CREATE_ARTICLE}_LOADING`
    };
    const secondState = createArticleReducer(firstState, secondAction);

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
