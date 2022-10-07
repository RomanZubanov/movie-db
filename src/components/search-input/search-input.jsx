import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Input } from 'antd';

import './search-input.css';

function SearchInput({ onSearchChange }) {
  const onInputChange = ({ target: { value } }) => {
    if (value.length >= 3) {
      onSearchChange(value);
    }
  };

  return (
    <div className="search-container">
      <Input size="large" placeholder="Type to search..." onChange={debounce(onInputChange, 2000)} />
    </div>
  );
}

SearchInput.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchInput;
