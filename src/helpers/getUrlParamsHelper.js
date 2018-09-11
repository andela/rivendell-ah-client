/* function to get values of all query parameters
Takes in all query parameters (UrlParamName) and location
*/
const getUrlParams = (UrlParamName, location) => {
  // getting all values of the query parameters using regex
  UrlParamName = UrlParamName.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const urlRegexExpresion = new RegExp(`[\\?&]${UrlParamName}=([^&#]*)`);
  const results = urlRegexExpresion.exec(location.search);
  return results === null ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
export default getUrlParams;
