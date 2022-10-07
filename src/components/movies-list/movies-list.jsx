import { useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import debounce from 'lodash/debounce';

import Cards from '../cards';

function MoviesList({ onSearchChange, onPageChange, onVote, totalMovies, ...moviesData }) {
  const [currentPage, setCurrentPage] = useState(1);

  const pageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const { moviesList, loading, error } = moviesData;
  return (
    <>
      <Cards moviesList={moviesList} loading={loading} error={error} onVote={onVote} />
      <Pagination
        className="pagination"
        current={currentPage}
        total={totalMovies}
        onChange={debounce(pageChange, 2000)}
        defaultPageSize={20}
        showSizeChanger={false}
        hideOnSinglePage
      />
    </>
  );
}

MoviesList.propTypes = {
  onPageChange: PropTypes.func.isRequired,
};

export default MoviesList;
