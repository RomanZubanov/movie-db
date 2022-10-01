import React from 'react';
import { Rate } from 'antd';

import './rating-stars.css';

function RatingStars({ onVote, movieId, rating }) {
  return <Rate allowHalf count={10} defaultValue={rating} onChange={(value) => onVote(movieId, value)} />;
}

export default RatingStars;

/*
https://developers.themoviedb.org/3/movies/rate-movie

POST
/movie/{movie_id}/rating

A valid session or guest session ID is required.

https://api.themoviedb.org/3/movie/{movie_id}/rating?api_key=<<api_key>>

Variables
api_key
Your TMDb API key
optional
Path Params
movie_id
Integer
required
Headers
Content-Type
application/json;charset=utf-8
required
Query String
api_key
<<api_key>>
required
guest_session_id
String
optional
session_id
String
optional

Request Body
{
  "value": 8.5
}


 */
