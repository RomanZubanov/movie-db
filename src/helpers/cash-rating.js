function cashRating(moviesList) {
  const ratingData = moviesList.map((movie) => ({ id: movie.id, rating: movie.rating }));
  localStorage.setItem('ratingData', JSON.stringify(ratingData));
}

export default cashRating;
