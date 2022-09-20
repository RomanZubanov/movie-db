export default class SearchMoviesService {
  _apiBase = 'https://api.themoviedb.org/3/';
  _apiKey = '12c052732f00500a4355cf2bf4538874';

  async getSearch(search) {
    const res = await fetch(
      `${this._apiBase}search/movie?api_key=${this._apiKey}&language=en-US&query=${search}&page=1&include_adult=false`
    );

    if (!res.ok) {
      throw new Error(`Could not fetch Search Movies. Received ${res.status}`);
    }
    return await res.json();
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
