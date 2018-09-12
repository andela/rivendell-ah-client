import chai from 'chai';
import categoryInputHelper from '../../src/helpers/categoryInputHelper';
import mockData from '../mockData';
/* eslint max-len: off */
describe('the pure function categoryInputHelper', () => {
  describe('when given an array of categories', () => {
    it('should return an empty array when the data passed is not an array', () => {
      const resultOne = categoryInputHelper();
      const resultTwo = categoryInputHelper('bad data');

      chai.expect(resultOne)
        .to.be.an('array')
        .lengthOf(0);
      chai.expect(resultTwo)
        .to.be.an('array')
        .lengthOf(0);
    });
    it('should all the subcategories in the categories array', () => {
      const subcategoriesArr = categoryInputHelper(
        mockData.categories
      );

      const totalSubcategories = mockData.categories
        .reduce((prev, currentValue) => {
          if (typeof prev === 'number') {
            return currentValue.subcategories.length + prev;
          }
          return currentValue.subcategories.length + prev.subcategories.length;
        });

      chai.expect(subcategoriesArr.length)
        .to.equal(totalSubcategories);
    });
  });
});
