import PropTypes from 'prop-types';
import { Rate } from 'antd';

import './rating-stars.css';

function RatingStars({ onVote, movieId, rating }) {
  return <Rate allowHalf count={10} defaultValue={rating} onChange={(value) => onVote(movieId, value)} />;
}

RatingStars.propTypes = {
  onVote: PropTypes.func.isRequired,
  movieId: PropTypes.number.isRequired,
  rating: PropTypes.number,
};

RatingStars.defaultProps = {
  rating: 0,
};

export default RatingStars;
