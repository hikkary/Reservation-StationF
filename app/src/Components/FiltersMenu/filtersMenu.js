import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const FILTERS_MENU_TITLE = 'FILTRE';

const FiltersMenu = () => (
	<div className="filtersMenu">
			<div className="filtersMenuTitle">
				<p>{FILTERS_MENU_TITLE}</p>
			</div>
	</div>
);

export default FiltersMenu;
