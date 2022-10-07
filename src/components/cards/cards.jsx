import { Spin } from 'antd';
import PropTypes from 'prop-types';

import CardItem from '../card-item';
import ErrorMessage from '../error-message';
import NothingFound from '../nothing-found';

import './cards.css';

function Cards({ moviesList, loading, error, onVote }) {
  const items = moviesList.map((item) => {
    const { id, ...movieInfo } = item;
    return <CardItem key={id} movieId={id} movieInfo={movieInfo} onVote={onVote} />;
  });

  const errorMessage = <ErrorMessage error={error} />;
  const spinLoading = <Spin size="large" />;
  const nothingFound = <NothingFound />;

  let element;

  if (error) {
    element = errorMessage;
  } else if (loading) {
    element = spinLoading;
  } else {
    element = items.length > 0 ? items : nothingFound;
  }

  return <div className="cards-container">{element}</div>;
}

Cards.propTypes = {
  moviesList: PropTypes.arrayOf(
    PropTypes.shape({
      optionalProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

Cards.defaultProps = {
  moviesList: [{ id: 0, title: '' }],
};

export default Cards;
