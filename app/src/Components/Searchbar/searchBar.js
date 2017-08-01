import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from './searchInput';

import './style.css';

const Searchbar = ({onKeyUp}) => (
	<div className="searchBar">
		<SearchInput onKeyUp={onKeyUp.bind(this)}/>
	</div>
);

Searchbar.propTypes = {
	onKeyUp: PropTypes.func,
}

export default Searchbar;
