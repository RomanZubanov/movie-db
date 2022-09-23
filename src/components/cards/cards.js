import React from 'react';
import { Spin } from 'antd';

import CardItem from '../card-item';
import ErrorMessage from '../error-message';

import './cards.css';

function Cards({ moviesList, loading, error }) {
  const items = moviesList.map((item) => {
    const { id, ...movieInfo } = item;
    return <CardItem key={id} movieInfo={movieInfo} />;
  });

  const errorMessage = <ErrorMessage error={error} />;
  const spinLoading = <Spin size="large" />;

  let element;

  if (error) {
    element = errorMessage;
  } else if (loading) {
    element = spinLoading;
  } else {
    element = items;
  }

  return <div className="cards-container">{element}</div>;
}

export default Cards;
