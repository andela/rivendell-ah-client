/**
   * @param {Array} ratings a list of rating info
   * @param {String} userId the userid (UUID)
   * @returns {Array} an array of raters info
   */
export function myRating(ratings, userId) {
  const rated = {
    myRate: 0,
    ratersInfo: [],
  };
  ratings.map((rating) => {
    if (rating.userId === userId) {
      rated.myRate = rating.rating;
    }
    const ratersInfo = {
      ...rating.user,
      rating: rating.rating,
      lastRated: rating.updatedAt,
      firstRated: rating.createdAt,
    };
    return rated.ratersInfo.push(ratersInfo);
  });
  return rated;
}

export default myRating;
