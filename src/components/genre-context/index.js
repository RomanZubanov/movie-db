import React from 'react';
import PropTypes from 'prop-types';

const { Provider: GenreProvider, Consumer: GenreConsumer } = React.createContext(undefined);

GenreProvider.defaultProps = {
  value: {},
};

GenreProvider.propTypes = {
  value: PropTypes.objectOf(PropTypes.string.isRequired),
};

export { GenreProvider, GenreConsumer };
