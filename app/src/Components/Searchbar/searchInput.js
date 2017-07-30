import React from 'react';
import PropTypes from 'prop-types';

const PLACEHOLDER = "Recherchez une salle";

const SearchInput = ({onKeyDown}) => (
	<input className="searchInput" name='searchInput' type="text" onKeyDown={onKeyDown} placeholder={PLACEHOLDER}></input>
);

SearchInput.propTypes = {
	onKeyDown: PropTypes.func,
}

export default SearchInput;
