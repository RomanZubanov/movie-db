import { genre } from './temp-object';

const makeGenreDictionary = (genreObject) => {
  const genreDictionary = {};
  genreObject.genres.forEach((item) => {
    genreDictionary[item.id] = item.name;
  });
  return genreDictionary;
};

const genreDictionary = makeGenreDictionary(genre);

function convertGenre(genreArr) {
  return genreArr.map((item) => genreDictionary[item]);
}

export default convertGenre;

// async function getGenres() {
//   const res = await fetch(
//     'https://api.themoviedb.org/3/genre/movie/list?api_key=12c052732f00500a4355cf2bf4538874&language=en-US'
//   );
//   if (!res.ok) {
//     throw new Error(`Could not fetch Genres. Received ${res.status}`);
//   }
//   return res.json();
// }
