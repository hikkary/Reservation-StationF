import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from './searchInput';

import './style.css';

const Searchbar = ({onKeyDown}) => (
	<div className="searchBar">
		<SearchInput onKeyDown={onKeyDown}/>
	</div>
);

Searchbar.propTypes = {
	onKeyDown: PropTypes.func,
}

export default Searchbar;
