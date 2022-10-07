import PropTypes from 'prop-types';
import './rating-average.css';

export default function RatingAverage({ ratingAverage }) {
  let classRatingAverage;
  if (ratingAverage < 3) {
    classRatingAverage = 'rating-average--0-3';
  } else if (ratingAverage >= 3 && ratingAverage < 5) {
    classRatingAverage = 'rating-average--3-5';
  } else if (ratingAverage >= 5 && ratingAverage < 7) {
    classRatingAverage = 'rating-average--5-7';
  } else {
    classRatingAverage = 'rating-average--7-10';
  }

  return <div className={`rating-average ${classRatingAverage}`}>{ratingAverage}</div>;
}

RatingAverage.propTypes = {
  ratingAverage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
