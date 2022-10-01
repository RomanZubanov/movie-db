import cutText from './cut-text';
import dateFormat from './date-format';

function transformMoviesArray(moviesArray) {
  return moviesArray.map((movie) => ({
    id: movie.id,
    title: cutText(movie.title, 40),
    releaseDate: dateFormat(movie.release_date),
    genres: movie.genre_ids,
    posterPath: movie.poster_path,
    overview: cutText(movie.overview, 180),
    ratingAverage: movie.vote_average.toFixed(1),
    rating: movie.rating,
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
      return await res.json();
    } catch (e) {
      if (e.name !== 'Error') {
        e.connection = true;
      }
      throw e;
    }
  }

  async getRatedMovies(sessionId) {
    try {
      const res = await fetch(
        `${this.apiBase}guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`
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

  async getMovies(search, page) {
    const result = await this.getSearch(search, page);
    const moviesList = transformMoviesArray(result.results);
    return {
      moviesList,
      totalPages: result.total_pages,
      totalMovies: result.total_results,
    };
  }
}
