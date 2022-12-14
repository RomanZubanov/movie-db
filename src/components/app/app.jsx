import { Component } from 'react';
import { Tabs } from 'antd';

import MoviesList from '../movies-list';
import GetMovies from '../../services/get-movies';
import getSessionId from '../../services/get-session-id';
import getGenresList from '../../services/get-genres-list';
import { GenreProvider } from '../genre-context';
import voting from '../../services/voting';
import './app.css';
import SearchInput from '../search-input';

export default class App extends Component {
  moviesService = new GetMovies();

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
      activeTab: 'search',
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
        this.updateMoviesSearch(search, 1);
      });
  }

  onSearchChange = (search) => {
    this.setState({
      search,
    });
    this.updateMoviesSearch(search, 1);
  };

  onPageChange = (pageNumber) => {
    const { search, activeTab } = this.state;
    if (activeTab === 'search') {
      this.updateMoviesSearch(search, pageNumber);
    } else {
      this.updateMoviesRated(pageNumber);
    }
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
    this.setState(({ moviesList }) => {
      const newArr = moviesList.map((movie) => {
        if (movieId === movie.id) {
          return { ...movie, rating: value };
        }
        return movie;
      });
      return { moviesList: newArr };
    });
  };

  onTabChange = (key) => {
    this.setState({ activeTab: key });
    if (key === 'rated') {
      this.updateMoviesRated(1);
    }
  };

  updateMoviesRated(page) {
    const { sessionId } = this.state;
    this.setState({
      loading: true,
    });
    this.moviesService.getRatedMovies(sessionId, page).then(
      ({ moviesList, totalMovies }) => {
        this.setState({
          moviesRatedList: moviesList,
          totalMoviesRated: totalMovies,
          loading: false,
        });
      },
      (e) => {
        this.onError(e);
      }
    );
  }

  updateMoviesSearch(search, page) {
    this.setState({
      loading: true,
    });
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
