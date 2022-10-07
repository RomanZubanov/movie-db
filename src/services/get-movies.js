import cashRating from '../helpers/cash-rating';
import transformMoviesArray from '../helpers/transform-movies-array';

export default class GetMovies {
  apiBase = 'https://api.themoviedb.org/3/';

  apiKey = '12c052732f00500a4355cf2bf4538874';

  async getMovies(search, page = 1) {
    try {
      const res = await fetch(
        `${this.apiBase}search/movie?api_key=${this.apiKey}&language=en-US&query=${search}&page=${page}&include_adult=false`
      );
      if (!res.ok) {
        throw new Error(`Could not fetch Search Movies. Received ${res.status}`);
      }
      const result = await res.json();
      const moviesList = transformMoviesArray(result.results);
      return {
        moviesList,
        totalPages: result.total_pages,
        totalMovies: result.total_results,
      };
    } catch (e) {
      if (e.name !== 'Error') {
        e.connection = true;
      }
      throw e;
    }
  }

  async getRatedMovies(sessionId, page = 1) {
    try {
      const res = await fetch(
        `${this.apiBase}guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}&page=${page}&language=en-US&sort_by=created_at.asc`
      );
      if (!res.ok) {
        throw new Error(`Could not fetch Search Movies. Received ${res.status}`);
      }
      const result = await res.json();
      const moviesList = transformMoviesArray(result.results);

      cashRating(moviesList);

      return {
        moviesList,
        totalPages: result.total_pages,
        totalMovies: result.total_results,
      };
    } catch (e) {
      if (e.name !== 'Error') {
        e.connection = true;
      }
      throw e;
    }
  }
}
