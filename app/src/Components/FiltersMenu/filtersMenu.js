import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CheckBox from './checkBox';
import './style.css';

const FILTERS_MENU_TITLE = 'FILTRE';


// fait un array unique des equipements
const filterParser = (filters) => {
	let filterTab = filters.map((filter) => {
		return filter.equipements
	})
	filterTab = _.flatten(filterTab);
	filterTab = filterTab.map((filter) => {
		return filter.name
	})
	filterTab = _.uniq(filterTab);
	return(filterTab)
}

const filterCreator = (filters, onClick) =>{
	const allFilters = filterParser(filters)
	const finalFilters = allFilters.map((filter, key)=>{
		return <CheckBox data={filter} key={key} onClick={onClick}/>
	})
	return finalFilters;
}

const FiltersMenu = ({filters, onSubmit, onClick}) => {
	return(
		<div className="filtersMenu">
			<div className="filtersMenuTitle">
				{/* <p>{FILTERS_MENU_TITLE}</p> */}
				<form type="submit" onSubmit={onSubmit}>
					{filterCreator(filters, onClick)}
					<input type="submit"/>
				</form>
			</div>
	</div>)};

FiltersMenu.propTypes = {
	filters: PropTypes.array,
	onSubmit: PropTypes.func,
	onClick: PropTypes.func,
}

export default FiltersMenu;
