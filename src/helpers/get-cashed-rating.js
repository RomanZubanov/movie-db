export default function getCashedRating(movie) {
  const ratingArr = JSON.parse(localStorage.getItem('ratingData'));
  if (ratingArr) {
    let rating;
    ratingArr.forEach((item) => {
      if (+item.id === +movie.id) {
        rating = item.rating;
      }
    });
    return rating;
  }
  return null;
}
