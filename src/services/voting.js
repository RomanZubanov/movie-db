export default function voting(sessionId, movieId, value) {
  const apiBase = 'https://api.themoviedb.org/3/';
  const apiKey = '12c052732f00500a4355cf2bf4538874';

  const rateObj = {
    value,
  };

  fetch(`${apiBase}movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(rateObj),
  });
}
