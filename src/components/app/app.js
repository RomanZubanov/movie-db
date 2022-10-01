import React, { Component } from 'react';
import { Tabs } from 'antd';

import MoviesList from '../movies-list';
import MoviesService from '../../services/search-movies-service';
import getSessionId from '../../services/get-session-id';
import getGenresList from '../../services/get-genres-list';
import { GenreProvider } from '../genre-context';
import voting from '../../services/voting';
import './app.css';
import SearchInput from '../search-input';

export default class App extends Component {
  moviesService = new MoviesService();

  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      moviesRatedList: [],
      totalMovies: null,
      totalMoviesRated: null,
      genreDictionary: {},
      search: 'return',
      loading: true,
      error: false,
      sessionId: null,
    };
  }

  componentDidMount() {
    const { search } = this.state;
    getGenresList()
      .then((res) => {
        this.setState({
          genreDictionary: res,
        });
      })
      .then(() => getSessionId())
      .then((res) => {
        this.setState({ sessionId: res });
      })
      .then(() => {
        this.updateMovies(search);
      });
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
    this.setState({
      loading: true,
    });
    this.updateMovies(search, pageNumber);
  };

  onError(e) {
    this.setState({
      loading: false,
      error: e,
    });
    throw e;
  }

  onVote = (movieId, value) => {
    const { sessionId } = this.state;
    voting(sessionId, movieId, value);
  };

  onTabChange = (key) => {
    const { sessionId } = this.state;
    if (key === 'rated') {
      this.setState({
        loading: true,
      });
      this.moviesService.getRatedMovies(sessionId).then(({ moviesList, totalMovies }) => {
        this.setState({
          moviesRatedList: moviesList,
          totalMoviesRated: totalMovies,
          loading: false,
        });
      });
    }
  };

  updateMovies(search, page = 1) {
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
    const { moviesList, moviesRatedList, genreDictionary, totalMovies, totalMoviesRated, loading, error } = this.state;
    const moviesSearch = (
      <div className="wrapper">
        <SearchInput onSearchChange={this.onSearchChange} />
        <MoviesList
          moviesList={moviesList}
          loading={loading}
          error={error}
          totalMovies={totalMovies}
          onSearchChange={this.onSearchChange}
          onPageChange={this.onPageChange}
          onVote={this.onVote}
        />
      </div>
    );
    const moviesRated = (
      <div className="wrapper">
        <MoviesList
          moviesList={moviesRatedList}
          loading={loading}
          error={error}
          totalMovies={totalMoviesRated}
          onSearchChange={this.onSearchChange}
          onPageChange={this.onPageChange}
          onVote={this.onVote}
        />
      </div>
    );
    return (
      <GenreProvider value={genreDictionary}>
        <Tabs
          defaultActiveKey="1"
          size="large"
          centered
          onChange={(key) => {
            this.onTabChange(key);
          }}
          items={[
            {
              label: 'Search',
              key: 'search',
              children: moviesSearch,
            },
            {
              label: 'Rated',
              key: 'rated',
              children: moviesRated,
            },
          ]}
        />
      </GenreProvider>
    );
  }
}
