import React from 'react';
import PropTypes from 'prop-types';

const PLACEHOLDER = "Recherchez une salle";

const SearchInput = ({onKeyUp}) => (
	<input className="searchInput" name='searchInput' type="text" onKeyUp={onKeyUp.bind(this)} maxLength="20" placeholder={PLACEHOLDER}></input>
);

SearchInput.propTypes = {
	onKeyUp: PropTypes.func,
}

export default SearchInput;
