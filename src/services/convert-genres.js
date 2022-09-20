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
  return genreArr.map((item) => {
    return genreDictionary[item];
  });
}

export default convertGenre;
