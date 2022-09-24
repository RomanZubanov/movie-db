import React, { Component } from 'react';

import Cards from '../cards';
import SearchInput from '../search-input';
import MoviesService from '../../services/search-movies-service';
import './app.css';

export default class App extends Component {
  moviesService = new MoviesService();

  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.updateMovies('dflkdfndfba;fbbeb');
  }

  onSearchChange = (search) => {
    this.setState({
      loading: true,
    });
    this.updateMovies(search);
  };

  onError(e) {
    this.setState({
      loading: false,
      error: e,
    });
    throw e;
  }

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

  render() {
    const { moviesList, loading, error } = this.state;
    return (
      <div>
        <SearchInput onSearchChange={this.onSearchChange} />
        <Cards moviesList={moviesList} loading={loading} error={error} />
      </div>
    );
  }
}
