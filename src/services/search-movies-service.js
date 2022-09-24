import cutText from './cut-text';
import dateFormat from './date-format';
import convertGenre from './convert-genres';

function transformMoviesArray(moviesArray) {
  return moviesArray.map((movie) => ({
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

  async getSearch(search, page = 1) {
    try {
      const res = await fetch(
        `${this.apiBase}search/movie?api_key=${this.apiKey}&language=en-US&query=${search}&page=${page}&include_adult=false`
      );
      if (!res.ok) {
        throw new Error(`Could not fetch Search Movies. Received ${res.status}`);
      }
      const result = await res.json();
      return result;
    } catch (e) {
      if (e.name !== 'Error') {
        e.connection = true;
      }
      throw e;
    }
  }

  async getMovies(search, page) {
    const searchData = await this.getSearch(search, page);
    const moviesList = transformMoviesArray(searchData.results);
    return {
      moviesList,
      totalPages: searchData.total_pages,
      totalMovies: searchData.total_results,
    };
  }
}
