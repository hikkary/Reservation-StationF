import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
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
	console.log(moment().format('YYYY-MM-DD'));
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

				<form type="submit">
					<input type='date' min={moment().format('YYYY-MM-DD')} max={moment().add('2','month').format('YYYY-MM-DD')} defaultValue={moment().format('YYYY-MM-DD')} />
					{filterCreator(filters, onClick)}
					<input type="submit"/>
				</form>
			</div>
	</div>)};

FiltersMenu.propTypes = {
	filters: PropTypes.array,
	onClick: PropTypes.func,
}

export default FiltersMenu;
