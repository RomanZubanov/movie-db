import cutText from './cut-text';
import dateFormat from './date-format';
import convertGenre from './convert-genres';

function transformMoviesList(moviesList) {
  return moviesList.results.map((movie) => ({
    id: movie.id,
    title: cutText(movie.title, 40),
    releaseDate: dateFormat(movie.release_date),
    genres: convertGenre(movie.genre_ids),
    posterPath: movie.poster_path,
    overview: cutText(movie.overview, 180),
  }));
}

export default class MoviesService {
  apiBase = 'https://api.themoviedb.org/3/';

  apiKey = '12c052732f00500a4355cf2bf4538874';

  async getSearch(search) {
    try {
      const res = await fetch(
        `${this.apiBase}search/movie?api_key=${this.apiKey}&language=en-US&query=${search}&page=1&include_adult=false`
      );
      if (!res.ok) {
        throw new Error(`Could not fetch Search Movies. Received ${res.status}`);
      }
      return await res.json();
    } catch (e) {
      if (e.name !== 'Error') {
        e.connection = true;
      }
      throw e;
    }
  }

  async getMovies(search) {
    const movies = await this.getSearch(search);
    return transformMoviesList(movies);
  }
}
