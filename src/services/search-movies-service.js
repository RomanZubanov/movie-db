import cutText from './cut-text';
import dateFormat from './date-format';
import convertGenre from './convert-genres';

export default class MoviesService {
  _apiBase = 'https://api.themoviedb.org/3/';
  _apiKey = '12c052732f00500a4355cf2bf4538874';

  async getSearch(search) {
    try {
      const res = await fetch(
        `${this._apiBase}search/movie?api_key=${this._apiKey}&language=en-US&query=${search}&page=1&include_adult=false`
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
    return this._transformMoviesList(movies);
  }

  _transformMoviesList(moviesList) {
    return moviesList.results.map((movie) => {
      return {
        id: movie.id,
        title: cutText(movie.title, 40),
        releaseDate: dateFormat(movie.release_date),
        genres: convertGenre(movie.genre_ids),
        posterPath: movie.poster_path,
        overview: cutText(movie.overview, 180),
      };
    });
  }

  async getGenres() {
    const res = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=12c052732f00500a4355cf2bf4538874&language=en-US'
    );
    if (!res.ok) {
      throw new Error(`Could not fetch Genres. Received ${res.status}`);
    }
    return await res.json();
  }
}
