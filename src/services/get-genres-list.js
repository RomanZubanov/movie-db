const makeGenreDictionary = (genreObject) => {
  const genreDictionary = {};
  genreObject.genres.forEach((item) => {
    genreDictionary[item.id] = item.name;
  });
  return genreDictionary;
};

export default async function getGenresList() {
  const res = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=12c052732f00500a4355cf2bf4538874&language=en-US'
  );
  if (!res.ok) {
    throw new Error(`Could not fetch Genres. Received ${res.status}`);
  }
  const genreList = await res.json();

  const GenreDictionary = makeGenreDictionary(genreList);

  return GenreDictionary;
}
