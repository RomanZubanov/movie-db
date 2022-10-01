import React from 'react';
import { Pagination } from 'antd';
import debounce from 'lodash/debounce';

import Cards from '../cards';

function MoviesList({ onSearchChange, onPageChange, onVote, totalMovies, ...moviesData }) {
  const { moviesList, loading, error } = moviesData;
  return (
    <>
      <Cards moviesList={moviesList} loading={loading} error={error} onVote={onVote} />
      <Pagination
        className="pagination"
        defaultCurrent={1}
        total={totalMovies}
        onChange={debounce(onPageChange, 2000)}
        defaultPageSize={20}
        showSizeChanger={false}
        hideOnSinglePage
      />
    </>
  );
}

export default MoviesList;
