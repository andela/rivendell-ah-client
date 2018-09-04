/* eslint max-len:off */
import chai from 'chai';
import loadCategoriesReducer from '../../src/reducers/loadCategoriesReducer';
import types from '../../src/actions/actionTypes';


const initialState = {
  isLoading: false,
  categories: [],
  errors: {},
  success: false
};


describe('loadCategoriesReducer', () => {
  describe('basic behaviour of the reducer', () => {
    it('should return the initital state when no state is specified', () => {
      const newState = loadCategoriesReducer();
      chai.expect(newState)
        .to.eql(initialState);
    });

    it(`should return a new state with loadin equal to true when ${types.LOAD_CATEGORIES}_LOADING is passed`, () => {
      const action = {
        type: `${types.LOAD_CATEGORIES}_LOADING`
      };
      const newState = loadCategoriesReducer(undefined, action);
      chai.expect(newState.isLoading)
        .to.equal(true);
    });


    it(`should return a new state with retrieved data when ${types.LOAD_CATEGORIES}_SUCCESS is passed`, () => {
      const action = {
        type: `${types.LOAD_CATEGORIES}_SUCCESS`,
        payload: {
          data: { categories: ['agriculture', 'life'] }
        }
      };
      const newState = loadCategoriesReducer(undefined, action);
      chai.expect(newState.success)
        .to.equal(true);
      chai.expect(newState.categories)
        .to.equal(action.payload.data.categories);
    });

    it(`should return a new state with errors when ${types.LOAD_CATEGORIES}_FAILURE is passed`, () => {
      const action = {
        type: `${types.LOAD_CATEGORIES}_FAILURE`,
        payload: {
          response: {
            status: 400,
            data: { errors: { message: 'bad data' } } }
        }
      };

      const newState = loadCategoriesReducer(undefined, action);
      chai.expect(newState.success)
        .to.equal(false);
      chai.expect(newState.editing)
        .to.equal(false);

      chai.expect(newState.error.status)
        .to.equal(action.payload.response.status);
      chai.expect(newState.error.message)
        .to.equal(action.payload.response.data.errors.message);
    });
  });
});
