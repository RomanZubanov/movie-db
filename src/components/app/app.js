import React, { Component } from 'react';
import { Pagination } from 'antd';
import debounce from 'lodash/debounce';

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
      totalMovies: null,
      search: 'return',
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    const { search } = this.state;
    this.updateMovies(search);
  }

  onSearchChange = (search) => {
    this.setState({
      loading: true,
      search,
    });
    this.updateMovies(search);
  };

  onPageChange = (pageNumber) => {
    const { search } = this.state;
    this.updateMovies(search, pageNumber);
  };

  onError(e) {
    this.setState({
      loading: false,
      error: e,
    });
    throw e;
  }

  updateMovies(search, page) {
    this.moviesService.getMovies(search, page).then(
      ({ moviesList, totalMovies }) => {
        this.setState({
          moviesList,
          totalMovies,
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
    const { moviesList, totalMovies, loading, error } = this.state;
    return (
      <div className="wrapper">
        <SearchInput onSearchChange={this.onSearchChange} />
        <Cards moviesList={moviesList} loading={loading} error={error} />
        <Pagination
          className="pagination"
          defaultCurrent={1}
          total={totalMovies}
          onChange={debounce(this.onPageChange, 2000)}
          defaultPageSize={20}
          showSizeChanger={false}
          hideOnSinglePage
        />
      </div>
    );
  }
}
