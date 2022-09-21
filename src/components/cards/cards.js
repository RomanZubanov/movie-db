import React from 'react';

import CardItem from '../card-item';

import './cards.css';

function Cards({ moviesList }) {
  const items = moviesList.map((item) => {
    const { id, ...movieInfo } = item;
    return <CardItem key={id} movieInfo={movieInfo} />;
  });

  return <div className="cards-container">{items}</div>;
}

export default Cards;
