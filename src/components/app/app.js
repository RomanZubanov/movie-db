import React, { Component } from 'react';

import Cards from '../cards';
import MoviesService from '../../services/search-movies-service';
import './app.css';

export default class App extends Component {
  moviesService = new MoviesService();

  constructor(props) {
    super(props);
    this.updateMovies('return');
  }

  state = {
    moviesList: [],
    loading: true,
    error: false,
  };

  updateMovies(search) {
    this.moviesService.getMovies(search).then(
      (movies) => {
        this.setState({
          moviesList: movies,
          loading: false,
        });
      },
      (e) => {
        this.onError(e);
      }
      // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
      // чтобы не перехватывать исключения из ошибок в самих компонентах.
    );
  }

  onError(e) {
    this.setState({
      loading: false,
      error: e,
    });
  }

  render() {
    const { moviesList, loading, error } = this.state;
    return <Cards moviesList={moviesList} loading={loading} error={error} />;
  }
}
