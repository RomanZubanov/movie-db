import cutText from './cut-text';
import dateFormat from './date-format';
import getCashedRating from './get-cashed-rating';

export default function transformMoviesArray(moviesArray) {
  return moviesArray.map((movie) => ({
    id: movie.id,
    title: cutText(movie.title, 40),
    releaseDate: dateFormat(movie.release_date),
    genres: movie.genre_ids,
    posterPath: movie.poster_path,
    overview: cutText(movie.overview, 180),
    ratingAverage: movie.vote_average.toFixed(1),
    rating: movie.rating || getCashedRating(movie),
  }));
}
