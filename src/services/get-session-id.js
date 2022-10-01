export default async function getSessionId() {
  let result = JSON.parse(localStorage.getItem('sessionId'));
  if (!result) {
    const urlBase = 'https://api.themoviedb.org/3/';
    const response = await fetch(`${urlBase}authentication/guest_session/new?api_key=12c052732f00500a4355cf2bf4538874`);
    result = await response.json();
    localStorage.setItem('sessionId', JSON.stringify(result));
  }

  return result.guest_session_id;
}
