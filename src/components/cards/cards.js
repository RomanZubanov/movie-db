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

  const element = error ? errorMessage : loading ? spinLoading : items;

  return <div className="cards-container">{element}</div>;
}

export default Cards;
