/**
 *This returns an array of subcategories that the user
 can easily select.
 It returns an empty array when invalid data is passed
 to it as argument
 * @param {Array} categories the categories in the
 * appication
 * @returns {Array} an array that contains all
 * the sub categories in the app
 */
function categoryInputHelper(categories = []) {
  categories = Array.isArray(categories) ? categories : [];
  const subcategories = [];
  categories.forEach((category) => {
    subcategories.push(...category.subcategories);
  });
  return subcategories
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map(subCat => ({
      text: subCat.name,
      value: subCat.name,
    }));
}
export default categoryInputHelper;
