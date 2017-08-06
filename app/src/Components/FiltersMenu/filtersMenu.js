import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import CheckBox from './checkBox';
import InputDate from './inputDate';
import CapacityRange from './capacityRange';
import './style.css';

class FiltersMenu extends Component {
	state = {
		secondBookingHourStart: 0,
		secondExist: true,
	}
		componentDidMount(){
			const { selectedDate } = this.props;
			//Setting The hour for the selector
			this.setState({secondBookingHourStart: this.timePicker(selectedDate) + 1, secondBookingHour: this.timePicker(selectedDate) + 1} ,() =>{
				this.props.getHours(this.timePicker(selectedDate), this.state.secondBookingHour)
			})
		}

   // Go Through all rooms to create an array which contains all the equipments
	 filterParser = (filters) => {
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

	  // return a CheckBox Component for each equipments found in rooms
	 filterCreator = (filters, onClick) =>{
		const allFilters = this.filterParser(filters)
		const finalFilters = allFilters.map((filter, key)=>{
			return <CheckBox data={filter} key={key} onClick={onClick}/>
		})
		return finalFilters;
	}

		// Depending on the hour of the day, return the hour + 1 or 8 am (The date will be the day after)
		// if the user is on the page after 6pm
	 timePicker = (selectedDate) => {
			const whatHourIsIt = moment().format('HH')
			const whatDayIsIt = moment().format('YYYY-MM-DD')
			if (!selectedDate) return
			if(Number(whatHourIsIt) >= 18 || Number(whatHourIsIt) < 8 || selectedDate !== whatDayIsIt ){
						return 8;
			} else {
				return Number(moment().add('1', 'hours').format('HH'));
			}
	}

	// handle the hours diplay on the first Hour Select element
	 firstSelectCreator = (selectedDate) =>{
		const whatTimeIsIt = this.timePicker(selectedDate);
		const timeArray = [];
		 for (let i = whatTimeIsIt; i <= 19; i++){
			timeArray.push(<option key={i} value={i} >{i}H</option>)
		}
		return timeArray;
	}

	// handle the second hours diplay on the first Hour Select element
	secondSelectCreator = (time) => {
		const timeArray = [];
		for (let i = time; i <= 20; i++){
		 	timeArray.push(<option key={i} value={i} >{i}H</option>)
	 }
	 return timeArray;
	}

	// when A change is detected on the First hour selector, we automatically update the second hour selector (first + 1)
	handleChangeSecondTimeSelector = (time) => {
		const primaryHour = Number(time.target.value);
		this.setState({primaryHour ,secondBookingHour: primaryHour + 1, secondBookingHourStart: primaryHour + 1, secondExist: false},() =>{
			this.setState({secondExist: true}); // We rewrite the Component in order to make the change effective
			this.props.getHours(primaryHour,this.state.secondBookingHour) // we update the hour filters (function in Container/home.js)
		})
	}

	// handle the change on the second Hour selector
	handleSecondTimeSelector = (time) => {
		let secondHour = Number(time.target.value);
		this.setState({secondBookingHour: secondHour},() =>{
			this.props.getHours(this.state.primaryHour, secondHour)
		})
	}

	render(){
		const {filters, onClick, getDate, selectedDate, onRangeChange, maxCapacity, minCapacity, currentCapacity} = this.props
		const firstSelect = this.firstSelectCreator(selectedDate); // create an array of <option>
		const secondSelect = this.secondSelectCreator(this.state.secondBookingHourStart); // create an array of <option>
	return(
		<div className="filtersMenu">
			<div className="filtersMenuTitle">
				<p>Filtres</p>
				<form type="submit">
					<InputDate getDate={getDate}/>
					<div className="hourPicker">
						<select id="primaryHour" onChange={this.handleChangeSecondTimeSelector}>
							{firstSelect.map((time) => time)}
						</select>
							<p>A</p>
						{this.state.secondExist &&
							<select id="secondHour" onChange={this.handleSecondTimeSelector}>
						 		{secondSelect.map((time) => time)}
							</select>
						}
					</div>
					{this.filterCreator(filters, onClick)}
					<CapacityRange onRangeChange={onRangeChange} title="Capacité Salle" minCapacity={minCapacity} maxCapacity={maxCapacity} currentCapacity={currentCapacity} />
				</form>
			</div>
	</div>)}};

FiltersMenu.propTypes = {
	filters: PropTypes.array,
	onClick: PropTypes.func,
	getHours: PropTypes.func,
	getDate: PropTypes.func,
	selectedDate: PropTypes.string,
	onRangeChange: PropTypes.func,
	minCapacity: PropTypes.number,
	maxCapacity: PropTypes.number,
	currentCapacity: PropTypes.number,
}

export default FiltersMenu;
