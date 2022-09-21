import React, { Component } from 'react';

import cutText from '../../services/cut-text';
import dateFormat from '../../services/date-format';
import convertGenre from '../../services/convert-genres';
import Cards from '../cards';
import SearchMoviesService from '../../services/search-movies-service';
import './app.css';

export default class App extends Component {
  searchMoviesService = new SearchMoviesService();

  constructor(props) {
    super(props);
    this.updateMoviesList('return');
  }

  state = {
    moviesList: [
      {
        id: 0,
        title: null,
        releaseDate: null,
        genres: [null],
        posterPath: null,
        overview: null,
      },
    ],
  };

  updateMoviesList(search) {
    this.searchMoviesService.getSearch(search).then((moviesPage) => {
      const moviesArr = moviesPage.results.map((item) => {
        return {
          id: item.id,
          title: cutText(item.title, 40),
          releaseDate: dateFormat(item.release_date),
          genres: convertGenre(item.genre_ids),
          posterPath: item.poster_path,
          overview: cutText(item.overview, 180),
        };
      });
      this.setState({
        moviesList: moviesArr,
      });
    });
  }

  render() {
    return (
      <div>
        <Cards moviesList={this.state.moviesList} />
      </div>
    );
  }
}
