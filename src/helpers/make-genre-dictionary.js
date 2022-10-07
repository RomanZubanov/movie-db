const makeGenreDictionary = (genreObject) => {
  const genreDictionary = {};
  genreObject.genres.forEach((item) => {
    genreDictionary[item.id] = item.name;
  });
  return genreDictionary;
};

export default makeGenreDictionary;
